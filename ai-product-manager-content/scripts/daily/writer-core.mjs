// Shared pieces of the daily writer, used by every writer mode:
//   - API mode           scripts/daily/write-reel.mjs (Claude API key)
//   - Subscription mode  prepare-brief.mjs → Claude Code GitHub Action → finalize-draft.mjs
//   - Queue mode         dequeue.mjs (pre-written drafts in data/queue, no model at all)
// The brief, editor rubric, normalisation and validation are identical in all three.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, ensureDir, reelPath} from '../lib.mjs';
import {limitsForPrompt} from '../content-limits.mjs';
import {syncRegistry} from '../sync-registry.mjs';
import {pickStyle} from '../style.mjs';
import {PILLARS, history, nextReelNumber, planNext} from './plan.mjs';

export const isoDate = (d = new Date()) => d.toISOString().slice(0, 10);
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
export const loadFormats = () => JSON.parse(read('src/templates/formats.json'));

/** Plan today's reel, applying optional overrides ({topic, angle, format, pillar}). */
export function makePlan(overrides = {}, today = new Date()) {
  const plan = planNext({today});
  if (overrides.topic) Object.assign(plan, {topic: overrides.topic, angle: overrides.angle ?? null, backlogId: null, research: !!overrides.research});
  if (overrides.format) plan.format = overrides.format;
  if (overrides.pillar) {
    const k = overrides.pillar.toUpperCase();
    Object.assign(plan, {pillar: k, pillarName: PILLARS[k]});
  }
  const format = loadFormats().find((f) => f.id === plan.format);
  if (!format) throw new Error(`Unknown format ${plan.format}`);
  return {plan, format};
}

export const avoidList = (hist) =>
  hist
    .slice(-40)
    .map((h) => `- ${h.id} [${h.pillar}/${h.format}] topic: ${h.topic} | hook: ${h.hook} | insight: ${h.insight}`)
    .join('\n');

export function systemText() {
  return `You are the writer and editor for the Instagram page "AI Product Manager". Each day you produce one complete reel as a JSON content file that a Remotion template renders directly. Nothing you write is post-edited by a designer, so the JSON must be correct, the copy must fit the layout, and the insight must be genuinely useful.

<brand_and_quality_bar>
${read('CONTENT_SYSTEM.md')}
</brand_and_quality_bar>
Note: the codebase described in the brief above (Remotion components, scripts, QA gates) already exists. Your job is only the content file.

<render_contract>
The JSON must conform to this TypeScript schema (ReelConfig). Scene components exist only for these scene types: hook, cards, table, comparison, checklist, diagram, terminal, takeaway.
${read('src/content/schema.ts')}
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
- No fabricated statistics, studies, quotes, customer stories, benchmarks or vendor claims. Numbers used to illustrate must be labelled: set illustrativeLabel "ILLUSTRATIVE" on comparison scenes (or put ILLUSTRATIVE in the scene kicker) and say "illustrative" in the caption, and add a claims entry of kind "illustrative".
- Every claims entry of kind "verified-fact" needs sources [{url, accessed: "YYYY-MM-DD"}] taken from pages you actually retrieved this session. If you cannot verify something, rephrase it as practitioner opinion or drop it.
- Never name or imply an employer, customer or vendor endorsement. No hype words (game-changer, revolutionary, 10x, guaranteed, mind-blowing).
- Use typographic apostrophes (’) in on-screen copy.
</honesty_rules>

<example_of_a_complete_reel>
${read('src/content/reels/aipm-001-demo-prompts-not-evals.json')}
</example_of_a_complete_reel>`;
}

export function briefText(plan, format, date = isoDate()) {
  return `Write today's reel (${date}).

Pillar: ${plan.pillarName}
Format: ${format.name} — arc: ${format.arc}
Default scene plan for this format (adapt if a different sequence explains the idea better; keep 4–7 scenes, last = takeaway):
${format.scenes.map((s, i) => `  ${i + 1}. ${s.type} (~${s.seconds}s) — ${s.purpose}`).join('\n')}
${plan.topic ? `Topic: ${plan.topic}\nAngle to develop: ${plan.angle ?? '(choose the sharpest, most underexplained angle)'}` : `Topic: none assigned. Propose a high-value, evergreen topic for this pillar that is clearly different from everything listed below, and put it in brief.topic.`}
${plan.research ? `Research: REQUIRED. Use web search to verify any factual claim about current tools, models, regulations or research before using it, and record each source in claims.` : 'Research: not required. Do not state current-events facts; keep claims to durable practice, reasoning and clearly labelled illustrations.'}
${plan.sources?.length ? `Starting sources from the topic scan:\n${plan.sources.map((s) => `- ${s.url}${s.title ? ` (${s.title})` : ''}`).join('\n')}` : ''}

Objective: saves and shares from intelligent, time-poor professionals. "Intriguing" here means a specific, counterintuitive or underexplained insight that changes what someone does at work tomorrow — not a vague tease.

Already published or planned — do NOT repeat these topics, hooks or core insights, and avoid near-duplicates:
${avoidList(plan.history) || '(none yet)'}

Requirements:
- Three genuinely different hook options (different angles), honestly scored 1–5 on specificity, relevance, curiosity, credibility, comprehension; choose the best; explain why.
- One core insight a viewer could repeat in one sentence.
- One primary CTA, identical in primaryCta.text and the takeaway scene cta; caption ends with that same CTA in caption.cta. Prefer "save" for frameworks/checklists, "share" for myths/mistakes teams make, "question" only when the audience can contribute real experience.
- Caption: specific first line, readable line breaks (\\n), adds context without repeating the whole video, 3–6 relevant hashtags, under 1,500 characters.
- Fill storyboard, onScreen, purpose and voiceover for every scene. Fill repurposing (carousel slide list, follow-up reel idea, LinkedIn angle) and publish.suggestedDate (today or tomorrow).
- Set brief.format to "${plan.format}", brief.pillar to "${plan.pillarName}", brief.voiceover false, brief.research "${plan.research ? 'required' : 'not-required'}".

Return ONLY the JSON object (no prose, no code fences). Omit id, version, status, fps, width, height and audio — the pipeline sets those.`;
}

export function criticText(hist, reelJson) {
  return `Act as a demanding editor for this page. Review the draft reel below against the brand brief and quality bar. Judge it as a skeptical senior product leader scrolling Instagram would.

Score 1–5: hook (specific, clear in 2 s, earns curiosity), insight (useful, non-obvious, one idea), accuracy (no overclaims, illustrations labelled, nothing that would embarrass a practitioner), intrigue (would someone stop scrolling and save/share it?), clarity (each scene readable, logical flow, payoff delivers the hook's promise), brandFit (tone, no hype, practitioner voice).
List mustFix items only for real problems (inaccuracy, overclaim, confusing step, hook not delivered, filler scene, weak/generic insight). Be concrete: name the scene and the fix.

Previously published (novelty check):
${avoidList(hist) || '(none)'}

Draft:
${reelJson}

Return ONLY JSON: {"scores":{"hook":n,"insight":n,"accuracy":n,"intrigue":n,"clarity":n,"brandFit":n},"verdict":"pass"|"revise","mustFix":["..."],"niceToHave":["..."]}. verdict is "pass" only if every score ≥ 4 and mustFix is empty.`;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 6)
    .join('-');

/** Turns a model- or human-written draft into a complete ReelConfig. */
export function normalizeDraft(draft, plan, {reelId = null, source = 'unknown', date = isoDate()} = {}) {
  const coverWords = (draft.cover?.headline ?? []).map((l) => l.text).join(' ');
  const id = reelId ?? `aipm-${String(nextReelNumber()).padStart(3, '0')}-${slugify(coverWords || draft.brief?.topic || 'reel')}`;
  return {
    id,
    version: 1,
    status: 'draft',
    ...draft,
    brief: {
      ...draft.brief,
      backlogId: plan.backlogId ?? draft.brief?.backlogId ?? null,
      queueId: draft.brief?.queueId ?? null,
      writer: source,
      pillar: plan.pillarName ?? draft.brief?.pillar,
      format: plan.format ?? draft.brief?.format,
      voiceover: false,
      research: plan.research ? 'required' : draft.brief?.research ?? 'not-required',
      constraints: draft.brief?.constraints ?? [],
    },
    fps: 30,
    width: 1080,
    height: 1920,
    style: pickStyle(id, draft.style),
    audio: {bed: `audio/${id}-bed.wav`, bedVolume: 1, voiceover: null, voiceoverVolume: 1},
    claims: draft.claims ?? [],
    publish: {suggestedDate: draft.publish?.suggestedDate ?? date, notes: draft.publish?.notes ?? ''},
  };
}

const words = (s) => new Set((s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3));
const jaccard = (a, b) => {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
};

/**
 * Structural + novelty checks, then writes the reel file and runs the
 * pre-render validator (copy limits, safe-zone layout). Returns error strings.
 * On errors the reel file is removed again.
 */
export function validateReel(reel, hist) {
  const errors = [];
  if (!Array.isArray(reel.scenes) || reel.scenes.length < 3) errors.push('scenes: need at least 3 scenes');
  if (!Array.isArray(reel.hooks) || reel.hooks.length !== 3) errors.push('hooks: need exactly 3 options');
  if (!(reel.selectedHook >= 0 && reel.selectedHook < (reel.hooks?.length ?? 0))) errors.push('selectedHook out of range');
  for (const h of hist) {
    if (h.id === reel.id) continue;
    if (jaccard(reel.coreInsight, h.insight) > 0.55 || jaccard(reel.hooks?.[reel.selectedHook]?.text, h.hook) > 0.6) {
      errors.push(`too similar to ${h.id} ("${h.hook}") — choose a different angle`);
    }
  }
  if (errors.length) return errors;
  fs.writeFileSync(reelPath(reel.id), JSON.stringify(reel, null, 2) + '\n');
  syncRegistry();
  const r = spawnSync('node', ['scripts/validate-content.mjs', reel.id, '--pre-render', '--json'], {cwd: ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
  const line = r.stdout.trim().split('\n').filter((l) => l.startsWith('{')).pop();
  const out = line
    ? JSON.parse(line).checks.filter((c) => !c.pass && c.severity === 'error').map((c) => `${c.name}: ${c.detail}`)
    : [`validator crashed: ${(r.stderr || r.stdout).slice(-600)}`];
  if (out.length) {
    fs.unlinkSync(reelPath(reel.id));
    syncRegistry();
  }
  return out;
}

export function writeLog(reelId, log) {
  ensureDir(path.join(ROOT, 'output', 'daily'));
  fs.writeFileSync(path.join(ROOT, 'output', 'daily', `${reelId}.writer.json`), JSON.stringify(log, null, 2));
}

export {history};
