#!/usr/bin/env node
// Tells you exactly what is (and isn't) ready for automated Instagram posting.
//   node scripts/daily/check-instagram.mjs
// Never prints the token.
import {graph, igConfig, missingConfig, publishingQuota} from './instagram.mjs';

const c = igConfig();
const ok = (m) => console.log(`✅ ${m}`);
const bad = (m) => console.log(`❌ ${m}`);
const info = (m) => console.log(`ℹ️  ${m}`);
let failures = 0;

info(`Login type: ${c.login} → ${c.host}/${c.version}; upload mode: ${c.uploadMode}`);
if (c.login !== 'facebook' && c.uploadMode === 'resumable') {
  bad('Resumable upload is documented for Facebook Login apps only. Set IG_UPLOAD_MODE=url or IG_LOGIN=facebook.');
  failures++;
}
const missing = missingConfig(c);
if (missing.length) {
  bad(`Missing secrets: ${missing.join(', ')}. See AUTOMATION.md → "Instagram setup".`);
  process.exit(1);
}
ok('IG_ACCESS_TOKEN and IG_USER_ID are set');

try {
  if (c.login === 'facebook') {
    const acct = await graph('GET', c.userId, {fields: 'id,username,name'}, c);
    ok(`Token can read the Instagram account @${acct.username ?? '?'} (${acct.id})`);
  } else {
    const me = await graph('GET', 'me', {fields: 'user_id,username,account_type'}, c);
    ok(`Token belongs to @${me.username} (${me.account_type ?? 'account type not returned'})`);
    if (me.user_id && String(me.user_id) !== String(c.userId)) {
      bad(`IG_USER_ID (${c.userId}) differs from the token's user_id (${me.user_id}). Use ${me.user_id}.`);
      failures++;
    }
    if (me.account_type && !['BUSINESS', 'MEDIA_CREATOR', 'CREATOR'].includes(String(me.account_type).toUpperCase())) {
      bad('Publishing requires an Instagram professional (Business or Creator) account.');
      failures++;
    }
  }
} catch (e) {
  bad(`Account lookup failed: ${e.message}`);
  failures++;
}

const quota = await publishingQuota(c);
if (quota?.error) {
  bad(`Publishing-limit check failed (often a missing content-publish permission): ${quota.error}`);
  failures++;
} else if (quota) {
  ok(`Content publishing permission works; quota usage ${JSON.stringify(quota)}`);
}

if (!process.env.ANTHROPIC_API_KEY) {
  bad('ANTHROPIC_API_KEY is not set (needed by the daily writer).');
  failures++;
} else ok('ANTHROPIC_API_KEY is set');

console.log(failures ? `\n${failures} problem(s) to fix before automated posting.` : '\nReady: the publisher can post approved reels.');
process.exit(failures ? 1 : 0);
