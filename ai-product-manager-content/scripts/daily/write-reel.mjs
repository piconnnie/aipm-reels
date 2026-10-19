#!/usr/bin/env node
// Daily writer: plans a topic, asks Claude to write a complete reel content
// file, then loops: deterministic validation (copy limits, safe-zone layout,
// structure) + an editorial critic pass → revision, up to MAX_ROUNDS.
//
//   node scripts/daily/write-reel.mjs [--topic "..."] [--format <id>] [--pillar A-F] [--dry-plan]
//
// Writes src/content/reels/<id>.json and output/daily/<id>.writer.json, and
// prints the new reel id on the last line of stdout (used by the workflow).
// Requires ANTHROPIC_API_KEY. Model: AIPM_MODEL (default claude-opus-5-5).
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, ensureDir, reelPath} from '../lib.mjs';
import {limitsForPrompt} from '../content-limits.mjs';
import {syncRegistry} from '../sync-registry.mjs';
import {DEFAULT_MODEL, ask, estimateCost, parseJsonObject} from './claude.mjs';
import {PILLARS, markUsed, nextReelNumber, planNext} from './plan.mjs';

const MAX_ROUNDS = Number(process.env.AIPM_MAX_ROUNDS ?? 3);
const args = process.argv.slice(2);
const opt = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const today = new Date();
const isoDate = today.toISOString().slice(0, 10);

// ---------------------------------------------------------------- Plan
const plan = planNext({today});
if (opt('topic')) Object.assign(plan, {topic: opt('topic'), angle: opt('angle') ?? null, backlogId: null});
if (opt('format')) plan.format = opt('format');
if (opt('pillar')) Object.assign(plan, {pillar: opt('pillar').toUpperCase(), pillarName: PILLARS[opt('pillar').toUpperCase()]});
const formats = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/templates/formats.json'), 'utf8'));
const format = formats.find((f) => f.id === plan.format);
if (!format) throw new Error(`Unknown format ${plan.format}`);
console.log(`Plan: [${plan.pillarName}] ${plan.topic ?? '(writer proposes a topic)'} — format ${format.name}${plan.research ? ' — research on' : ''}`);
if (args.includes('--dry-plan')) process.exit(0);

// --------------------------------------------------------- Prompt pieces
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const brandDoc = read('CONTENT_SYSTEM.md');
const schemaTs = read('src/content/schema.ts');
const example = read('src/content/reels/aipm-001-demo-prompts-not-evals.json');
const avoid = plan.history
  .slice(-40)
  .map((h) => `- ${h.id} [${h.pillar}/${h.format}] topic: ${h.topic} | hook: ${h.hook} | insight: ${h.insight}`)
  .join('\n');

const system = [
  {
    type: 'text',
    text: `You are the writer and editor for the Instagram page "AI Product Manager". Each day you produce one complete reel as a JSON content file that a Remotion template renders directly. Nothing you write is post-edited by a designer, so the JSON must be correct, the copy must fit the layout, and the insight must be genuinely useful.

<brand_and_quality_bar>
${brandDoc}
</brand_and_quality_bar>
Note: the codebase described in the brief above (Remotion components, scripts, QA gates) already exists. Your job is only the content file.

<render_contract>
The JSON must conform to this TypeScript schema (ReelConfig). Scene components exist only for these scene types: hook, cards, table, comparison, checklist, diagram, terminal, takeaway.
${schemaTs}
</render_contract>

<layout_limits>
Hard limits enforced by an automated validator (characters, counted literally). Exceeding any of them fails the build.
${limitsForPrompt()}
</layout_limits>

<timing_rules>
- 30 fps. Hook scene 75–90 frames and fully readable on frame 0. Give viewers ~0.35 s per word of on-screen copy plus 1 s, so dense scenes need more frames.
- A new visual beat roughly every 1.5–3 s: use popStart/popStagger, swapStart/swapStagger, rowStart/rowStagger, itemStart/itemStagger, nodeStart/nodeStagger, rightAt, conclusionAt, ctaAt and endCardAt (all frames relative to the scene start) to stage reveals. Leave ≥1.5 s after the final reveal of each scene before it ends.
- sfx cues (whoosh, tick, chime, low, impact) land on the frame of the reveal they reinforce: whoosh at frame 0 of scenes 2+, tick on card/row/item reveals (+2 to +6 frames), chime for a positive result, low for a risk/negative turn, impact for the key line. Keep them sparse.
- transitionIn: "fade-up" by default; "cut" only when the next scene continues the same visual (e.g. the same card stack flipping).
</timing_rules>

<honesty_rules>
- No fabricated statistics, studies, quotes, customer stories, benchmarks or vendor claims. Numbers used to illustrate must be labelled: set illustrativeLabel "ILLUSTRATIVE" on comparison scenes and say "illustrative" in the caption, and add a claims entry of kind "illustrative".
- Every claims entry of kind "verified-fact" needs sources [{url, accessed: "YYYY-MM-DD"}] taken from pages you actually retrieved this session. If you cannot verify something, rephrase it as practitioner opinion or drop it.
- Never name or imply an employer, customer or vendor endorsement. No hype words (game-changer, revolutionary, 10x, guaranteed, mind-blowing).
- Use typographic apostrophes (’) in on-screen copy.
</honesty_rules>

<example_of_a_complete_reel>
${example}
</example_of_a_complete_reel>`,
    cache_control: {type: 'ephemeral'},
  },
];

const brief = `Write today's reel (${isoDate}).

Pillar: ${plan.pillarName}
Format: ${format.name} — arc: ${format.arc}
Default scene plan for this format (adapt if a different sequence explains the idea better; keep 4–7 scenes, last = takeaway):
${format.scenes.map((s, i) => `  ${i + 1}. ${s.type} (~${s.seconds}s) — ${s.purpose}`).join('\n')}
${plan.topic ? `Topic: ${plan.topic}\nAngle to develop: ${plan.angle ?? '(choose the sharpest, most underexplained angle)'}` : `Topic: none assigned. Propose a high-value, evergreen topic for this pillar that is clearly different from everything listed below, and put it in brief.topic.`}
${plan.research ? `Research: REQUIRED. Use web search to verify any factual claim about current tools, models, regulations or research before using it, and record each source in claims.` : 'Research: not required. Do not state current-events facts; keep claims to durable practice, reasoning and clearly labelled illustrations.'}
${plan.sources?.length ? `Starting sources from the topic scan:\n${plan.sources.map((s) => `- ${s.url}${s.title ? ` (${s.title})` : ''}`).join('\n')}` : ''}

Objective: saves and shares from intelligent, time-poor professionals. "Intriguing" here means a specific, counterintuitive or underexplained insight that changes what someone does at work tomorrow — not a vague tease.

Already published or planned — do NOT repeat these topics, hooks or core insights, and avoid near-duplicates:
${avoid || '(none yet)'}

Requirements:
- Three genuinely different hook options (different angles), honestly scored 1–5 on specificity, relevance, curiosity, credibility, comprehension; choose the best; explain why.
- One core insight a viewer could repeat in one sentence.
- One primary CTA, identical in primaryCta.text and the takeaway scene cta; caption ends with that same CTA in caption.cta. Prefer "save" for frameworks/checklists, "share" for myths/mistakes teams make, "question" only when the audience can contribute real experience.
- Caption: specific first line, readable line breaks (\\n), adds context without repeating the whole video, 3–6 relevant hashtags, under 1,500 characters.
- Fill storyboard, onScreen, purpose and voiceover for every scene. Fill repurposing (carousel slide list, follow-up reel idea, LinkedIn angle) and publish.suggestedDate (today or tomorrow).
- Set brief.format to "${plan.format}", brief.pillar to "${plan.pillarName}", brief.voiceover false, brief.research "${plan.research ? 'required' : 'not-required'}".

Return ONLY the JSON object (no prose, no code fences). Omit id, version, status, fps, width, height and audio — the pipeline sets those.`;

// ----------------------------------------------------------- Helpers
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 6)
    .join('-');

const number = String(nextReelNumber()).padStart(3, '0');
let reelId = null;

const normalize = (draft) => {
  const coverWords = (draft.cover?.headline ?? []).map((l) => l.text).join(' ');
  if (!reelId) reelId = `aipm-${number}-${slugify(coverWords || draft.brief?.topic || 'reel')}`;
  return {
    id: reelId,
    version: 1,
    status: 'draft',
    ...draft,
    brief: {...draft.brief, backlogId: plan.backlogId ?? null, pillar: plan.pillarName, format: plan.format, voiceover: false, research: plan.research ? 'required' : 'not-required', constraints: draft.brief?.constraints ?? []},
    fps: 30,
    width: 1080,
    height: 1920,
    audio: {bed: `audio/${reelId}-bed.wav`, bedVolume: 1, voiceover: null, voiceoverVolume: 1},
    claims: draft.claims ?? [],
    publish: {suggestedDate: draft.publish?.suggestedDate ?? isoDate, notes: draft.publish?.notes ?? ''},
  };
};

const words = (s) => new Set((s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3));
const jaccard = (a, b) => {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
};

const validate = (reel) => {
  const errors = [];
  if (!Array.isArray(reel.scenes) || reel.scenes.length < 3) errors.push('scenes: need at least 3 scenes');
  if (!Array.isArray(reel.hooks) || reel.hooks.length !== 3) errors.push('hooks: need exactly 3 options');
  if (!(reel.selectedHook >= 0 && reel.selectedHook < (reel.hooks?.length ?? 0))) errors.push('selectedHook out of range');
  for (const h of plan.history) {
    if (jaccard(reel.coreInsight, h.insight) > 0.55 || jaccard(reel.hooks?.[reel.selectedHook]?.text, h.hook) > 0.6) {
      errors.push(`too similar to ${h.id} ("${h.hook}") — choose a different angle`);
    }
  }
  if (errors.length) return errors;
  fs.writeFileSync(reelPath(reel.id), JSON.stringify(reel, null, 2) + '\n');
  syncRegistry();
  const r = spawnSync('node', ['scripts/validate-content.mjs', reel.id, '--pre-render', '--json'], {cwd: ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
  const line = r.stdout.trim().split('\n').filter((l) => l.startsWith('{')).pop();
  if (!line) return [`validator crashed: ${(r.stderr || r.stdout).slice(-600)}`];
  const report = JSON.parse(line);
  return report.checks.filter((c) => !c.pass && c.severity === 'error').map((c) => `${c.name}: ${c.detail}`);
};

const critique = async (reel) => {
  const res = await ask({
    system: system,
    effort: 'medium',
    maxTokens: 8000,
    messages: [
      {
        role: 'user',
        content: `Act as a demanding editor for this page. Review the draft reel below against the brand brief and quality bar. Judge it as a skeptical senior product leader scrolling Instagram would.

Score 1–5: hook (specific, clear in 2 s, earns curiosity), insight (useful, non-obvious, one idea), accuracy (no overclaims, illustrations labelled, nothing that would embarrass a practitioner), intrigue (would someone stop scrolling and save/share it?), clarity (each scene readable, logical flow, payoff delivers the hook's promise), brandFit (tone, no hype, practitioner voice).
List mustFix items only for real problems (inaccuracy, overclaim, confusing step, hook not delivered, filler scene, weak/generic insight). Be concrete: name the scene and the fix.

Previously published (novelty check):
${avoid || '(none)'}

Draft:
${JSON.stringify(reel)}

Return ONLY JSON: {"scores":{"hook":n,"insight":n,"accuracy":n,"intrigue":n,"clarity":n,"brandFit":n},"verdict":"pass"|"revise","mustFix":["..."],"niceToHave":["..."]}. verdict is "pass" only if every score ≥ 4 and mustFix is empty.`,
      },
    ],
  });
  const c = parseJsonObject(res.text);
  return {...c, usage: res.usage};
};

// ------------------------------------------------------------ Main loop
const usageTotal = {input_tokens: 0, output_tokens: 0, cache_read_input_tokens: 0, web_search_requests: 0};
const addUsage = (u) => Object.keys(usageTotal).forEach((k) => (usageTotal[k] += u?.[k] ?? 0));

const messages = [{role: 'user', content: brief}];
let first = await ask({system, messages, webSearch: plan.research, maxSearches: 8, maxTokens: 32000, effort: 'high'});
addUsage(first.usage);
let rawText = first.text;
const searchSources = first.sources;
let reel;
let lastErrors = [];
let lastCritic = null;
const rounds = [];

for (let round = 1; round <= MAX_ROUNDS + 1; round++) {
  let parseError = null;
  try {
    reel = normalize(parseJsonObject(rawText));
  } catch (e) {
    parseError = `Output was not valid JSON: ${e.message}`;
  }
  lastErrors = parseError ? [parseError] : validate(reel);
  lastCritic = null;
  if (!lastErrors.length) {
    lastCritic = await critique(reel);
    addUsage(lastCritic.usage);
  }
  const criticIssues = lastCritic && lastCritic.verdict !== 'pass' ? lastCritic.mustFix ?? [] : [];
  rounds.push({round, errors: lastErrors, critic: lastCritic && {scores: lastCritic.scores, verdict: lastCritic.verdict, mustFix: lastCritic.mustFix}});
  console.log(`Round ${round}: ${lastErrors.length} validation error(s); critic ${lastCritic ? `${lastCritic.verdict} ${JSON.stringify(lastCritic.scores)}` : 'skipped'}`);
  if (!lastErrors.length && (!lastCritic || lastCritic.verdict === 'pass')) break;
  if (round > MAX_ROUNDS) break;

  messages.push({role: 'assistant', content: rawText});
  messages.push({
    role: 'user',
    content: `Revise the reel and return the complete corrected JSON object only.
${lastErrors.length ? `Validator errors (all must be fixed; these are hard limits):\n${lastErrors.map((e) => `- ${e}`).join('\n')}` : ''}
${criticIssues.length ? `Editor's must-fix notes:\n${criticIssues.map((e) => `- ${e}`).join('\n')}` : ''}
${lastCritic?.niceToHave?.length ? `Optional improvements:\n${lastCritic.niceToHave.map((e) => `- ${e}`).join('\n')}` : ''}
Keep everything that already works. When shortening copy, rewrite for meaning rather than truncating.`,
  });
  const next = await ask({system, messages, maxTokens: 32000, effort: 'high'});
  addUsage(next.usage);
  rawText = next.text;
}

ensureDir(path.join(ROOT, 'output', 'daily'));
const log = {
  date: isoDate,
  model: DEFAULT_MODEL,
  plan: {...plan, history: undefined},
  reelId: reel?.id ?? null,
  rounds,
  finalCritic: lastCritic && {scores: lastCritic.scores, verdict: lastCritic.verdict, mustFix: lastCritic.mustFix, niceToHave: lastCritic.niceToHave},
  needsAttention: !!lastCritic && lastCritic.verdict !== 'pass',
  searchSources,
  usage: usageTotal,
  estimatedCostUsd: +estimateCost(usageTotal).toFixed(3),
};

if (lastErrors.length) {
  if (reel?.id && fs.existsSync(reelPath(reel.id))) fs.unlinkSync(reelPath(reel.id));
  syncRegistry();
  fs.writeFileSync(path.join(ROOT, 'output', 'daily', `failed-${isoDate}.writer.json`), JSON.stringify(log, null, 2));
  console.error(`Writer could not produce a valid reel after ${rounds.length} round(s):\n${lastErrors.join('\n')}`);
  process.exit(1);
}

if (args.includes('--mark-backlog')) markUsed(plan.backlogId, reel.id);
if (args.includes('--mark-backlog') && !plan.backlogId && reel.brief?.topic) {
  // Record writer-proposed topics so they are never proposed again.
  const {loadBacklog, saveBacklog} = await import('./plan.mjs');
  const b = loadBacklog();
  b.topics.push({id: `w${Date.now()}`, pillar: plan.pillar, format: plan.format, status: 'used', topic: reel.brief.topic, angle: reel.coreInsight, research: plan.research, usedBy: reel.id, addedBy: 'writer', addedAt: isoDate});
  saveBacklog(b);
}
fs.writeFileSync(path.join(ROOT, 'output', 'daily', `${reel.id}.writer.json`), JSON.stringify(log, null, 2));
console.log(`Writer cost ≈ $${log.estimatedCostUsd} (${usageTotal.input_tokens} in / ${usageTotal.output_tokens} out tokens, ${usageTotal.web_search_requests} searches)`);
console.log(reel.id);
