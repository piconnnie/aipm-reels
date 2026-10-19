#!/usr/bin/env node
// Auto-approval (opt-in: AIPM_AUTO_APPROVE=true). Runs at the start of each
// publish run. Once the local time passes AIPM_POST_TIME, it merges the oldest
// waiting review PR — but only one at a time, only if nothing approved is
// already waiting to post, and only while today's posting cap isn't used up.
//
// The morning-to-post-time gap is the veto window: close the PR, or add the
// `hold` label, and it is never auto-approved. PRs flagged `needs-attention`
// (the editor wasn't satisfied) always wait for a human.
//
//   node scripts/daily/auto-approve.mjs   → prints the merged PR number (or nothing)
// Uses the gh CLI (GH_TOKEN). Never posts by itself; sync-approvals + publish-due do that.
import {execFileSync} from 'node:child_process';
import {loadStates, localParts} from './publish-due.mjs';

const log = (m) => console.error(`auto-approve: ${m}`);
if (String(process.env.AIPM_AUTO_APPROVE).toLowerCase() !== 'true') {
  log('off (set the AIPM_AUTO_APPROVE variable to true to turn it on)');
  process.exit(0);
}
const POST_TIME = process.env.AIPM_POST_TIME || '19:00';
const MAX_PER_DAY = Number(process.env.AIPM_MAX_PER_DAY || 1);
const SKIP = new Set(['needs-attention', 'hold']);
const gh = (...args) => execFileSync('gh', args, {encoding: 'utf8'});

const now = localParts(new Date());
if (now.time < POST_TIME) {
  log(`before ${POST_TIME} (now ${now.time}): review window still open`);
  process.exit(0);
}
const states = loadStates();
const waiting = states.filter((s) => s.approval?.status === 'approved' && ['pending', 'failed'].includes(s.publish?.status ?? 'pending') && (s.publish?.attempts ?? 0) < 3);
if (waiting.length) {
  log(`${waiting[0].id} is already approved and waiting to post`);
  process.exit(0);
}
const postedToday = states.filter((s) => s.publish?.status === 'published' && s.publish.publishedAt && localParts(new Date(s.publish.publishedAt)).date === now.date).length;
if (postedToday >= MAX_PER_DAY) {
  log(`already posted ${postedToday} today`);
  process.exit(0);
}

const prs = JSON.parse(gh('pr', 'list', '--state', 'open', '--label', 'daily-reel', '--json', 'number,headRefName,labels,createdAt') || '[]')
  .filter((p) => p.headRefName?.startsWith('reel/'))
  .filter((p) => !(p.labels ?? []).some((l) => SKIP.has(l.name ?? l)))
  .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
if (!prs.length) {
  log('no review PRs eligible (none open, or all on hold / needs-attention)');
  process.exit(0);
}
const pr = prs[0];
let merged = false;
for (const method of ['--merge', '--squash', '--rebase']) {
  try {
    gh('pr', 'merge', String(pr.number), method);
    merged = true;
    break;
  } catch (e) {
    const msg = String(e.stderr || e.message);
    if (!/not allowed|merge method/i.test(msg)) {
      log(`couldn't merge PR #${pr.number}: ${msg.trim().split('\n').pop()}`);
      process.exit(0); // e.g. a conflict: leave it for a human, don't fail the publish run
    }
  }
}
if (!merged) {
  log(`no merge method allowed for PR #${pr.number}`);
  process.exit(0);
}
try {
  gh('pr', 'comment', String(pr.number), '--body', `🤖 Auto-approved at ${now.time} (AIPM_AUTO_APPROVE is on). To stop a future reel, close its PR or add the \`hold\` label before ${POST_TIME}.`);
} catch {}
log(`merged PR #${pr.number} (${pr.headRefName})`);
console.log(pr.number);
