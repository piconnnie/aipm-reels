#!/usr/bin/env node
// Merges output/daily/scan.json (from the weekly topic scan) into the backlog.
// Topics without sources, with an unknown pillar/format, or duplicating an
// existing topic are skipped.
//   node scripts/daily/apply-scan.mjs
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from '../lib.mjs';
import {PILLARS, loadBacklog, saveBacklog} from './plan.mjs';

const file = path.join(ROOT, 'output', 'daily', 'scan.json');
if (!fs.existsSync(file)) {
  console.log('No scan.json — nothing to add.');
  process.exit(0);
}
const today = new Date().toISOString().slice(0, 10);
const formats = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/templates/formats.json'), 'utf8')).map((f) => f.id));
const backlog = loadBacklog();
const seen = new Set(backlog.topics.map((t) => t.topic.toLowerCase().trim()));
const scan = JSON.parse(fs.readFileSync(file, 'utf8'));
let added = 0;
for (const t of scan.topics ?? []) {
  const sources = (t.sources ?? []).filter((s) => /^https?:\/\//.test(s.url ?? '')).map((s) => ({...s, accessed: today}));
  if (!sources.length || !PILLARS[t.pillar] || !formats.has(t.format) || !t.topic || seen.has(t.topic.toLowerCase().trim())) continue;
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
  seen.add(t.topic.toLowerCase().trim());
  added++;
}
saveBacklog(backlog);
console.log(`Topic scan added ${added} topic(s) to the backlog.`);
