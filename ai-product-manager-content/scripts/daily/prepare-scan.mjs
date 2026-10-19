#!/usr/bin/env node
// Weekly topic scan, subscription mode: writes instructions for the Claude Code
// GitHub Action to research timely topics and save them to output/daily/scan.json.
// apply-scan.mjs then merges them into data/topics/backlog.json.
//   node scripts/daily/prepare-scan.mjs [--count 4]
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, ensureDir} from '../lib.mjs';
import {PILLARS, history, loadBacklog} from './plan.mjs';

const ci = process.argv.indexOf('--count');
const count = ci > 0 ? Number(process.argv[ci + 1]) : 4;
const today = new Date().toISOString().slice(0, 10);
const existing = [...loadBacklog().topics.map((t) => `- ${t.topic}`), ...history().map((h) => `- ${h.topic}`)].join('\n');
const formats = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/templates/formats.json'), 'utf8')).map((f) => f.id).join(', ');
const P = 'ai-product-manager-content';

const md = `# Weekly topic scan — instructions for Claude Code

You find topics for "AI Product Manager", an educational Instagram page for product managers, engineers and leaders who build AI products. The page teaches durable, practical lessons — not news recaps. Pillars: ${Object.values(PILLARS).join('; ')}.

Today is ${today}.

1. Use web search and fetch to find developments from roughly the last 30 days that change how AI products are designed, evaluated, shipped, governed or priced (e.g. evaluation practices, agent reliability findings, pricing shifts, regulation milestones, notable launch post-mortems). Prefer primary sources: official docs and announcements, papers, regulators.
2. Turn the best ones into ${count} reel topics. Each must teach a lasting lesson a practitioner can apply, use the news only as the hook or evidence, and be clearly different from these existing topics:
${existing}
3. Write ONLY this JSON to \`${P}/output/daily/scan.json\`:
{"topics":[{"topic":"...","angle":"the specific, non-obvious lesson","pillar":"A|B|C|D|E|F","format":"one of: ${formats}","whyNow":"one sentence","sources":[{"url":"...","title":"...","published":"YYYY-MM-DD or null"}]}]}
   Use only URLs you actually opened. Every topic needs at least one source.
4. Stop. Do not edit any other file.
`;
ensureDir(path.join(ROOT, 'output', 'daily'));
fs.rmSync(path.join(ROOT, 'output', 'daily', 'scan.json'), {force: true});
fs.writeFileSync(path.join(ROOT, 'output', 'daily', 'scan-brief.md'), md);
console.log('output/daily/scan-brief.md ready');
