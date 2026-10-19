#!/usr/bin/env node
// Weekly topic scan: Claude searches the web for what AI product teams are
// dealing with right now and proposes researched, non-duplicate topics for
// the backlog (with sources). Keeps the daily feed fresh without turning the
// page into an AI-news account.
//   node scripts/daily/scan-trends.mjs [--count 4]
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from '../lib.mjs';
import {ask, estimateCost, parseJsonObject} from './claude.mjs';
import {PILLARS, history, loadBacklog, saveBacklog} from './plan.mjs';

const ci = process.argv.indexOf('--count');
const count = ci > 0 ? Number(process.argv[ci + 1]) : 4;
const today = new Date().toISOString().slice(0, 10);
const backlog = loadBacklog();
const existing = [...backlog.topics.map((t) => `- ${t.topic}`), ...history().map((h) => `- ${h.topic}`)].join('\n');
const formats = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/templates/formats.json'), 'utf8')).map((f) => f.id).join(', ');

const res = await ask({
  webSearch: true,
  maxSearches: 10,
  effort: 'high',
  maxTokens: 12000,
  system: `You find topics for "AI Product Manager", an educational Instagram page for product managers, engineers and leaders who build AI products. The page teaches durable, practical lessons — not news recaps. Pillars: ${Object.values(PILLARS).join('; ')}.`,
  messages: [
    {
      role: 'user',
      content: `Today is ${today}. Search the web for developments from roughly the last 30 days that change how AI products are designed, evaluated, shipped, governed or priced (e.g. new evaluation practices, agent reliability findings, pricing shifts, regulation milestones, notable launch post-mortems).

Turn the best ones into ${count} reel topics. Each must teach a lasting lesson that a practitioner can apply, use the news only as the hook or evidence, and be clearly different from these existing topics:
${existing}

Return ONLY JSON:
{"topics":[{"topic":"...","angle":"the specific, non-obvious lesson","pillar":"A|B|C|D|E|F","format":"one of: ${formats}","whyNow":"one sentence","sources":[{"url":"...","title":"...","published":"YYYY-MM-DD or null"}]}]}
Use only URLs you actually retrieved. Prefer primary sources (official docs, announcements, papers, regulators).`,
    },
  ],
});

const parsed = parseJsonObject(res.text);
const retrieved = new Set(res.sources.map((s) => s.url));
let added = 0;
for (const t of parsed.topics ?? []) {
  const sources = (t.sources ?? []).filter((s) => retrieved.has(s.url)).map((s) => ({...s, accessed: today}));
  if (!sources.length || !PILLARS[t.pillar]) continue; // unverifiable or malformed → skip
  backlog.topics.push({
    id: `s${today.replace(/-/g, '')}-${added + 1}`,
    pillar: t.pillar,
    format: t.format,
    status: 'open',
    topic: t.topic,
    angle: t.angle,
    whyNow: t.whyNow,
    research: true,
    sources,
    addedBy: 'trend-scan',
    addedAt: today,
  });
  added++;
}
saveBacklog(backlog);
console.log(`Trend scan added ${added} topic(s) (≈$${estimateCost(res.usage).toFixed(3)}, ${res.usage.web_search_requests} searches).`);
