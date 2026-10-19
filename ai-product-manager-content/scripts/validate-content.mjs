#!/usr/bin/env node
// Quality gates for a reel. Runs automated content, visual-layout and
// technical checks, extracts review frames, and records results in metadata.
//   node scripts/validate-content.mjs <reelId> [--content-only]
// Automated checks cannot replace a human watching and listening; those two
// checks are recorded as pending until `npm run approve` confirms them.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {OUT, ROOT, ensureDir, loadReel, readJsonIfExists, reelIdArg, saveReel, sceneTimings, totalFrames} from './lib.mjs';
import {syncRegistry} from './sync-registry.mjs';
import {checkLimits} from './content-limits.mjs';

syncRegistry();

const id = reelIdArg();
const contentOnly = process.argv.includes('--content-only');
const preRender = process.argv.includes('--pre-render'); // content + layout, no MP4 checks
const jsonOut = process.argv.includes('--json');
const reel = loadReel(id);
const timings = sceneTimings(reel);
const frames = totalFrames(reel);
const expectedSec = frames / reel.fps;
const qaDir = path.join(OUT.qa, id);
ensureDir(path.join(qaDir, 'frames'));

const checks = [];
const add = (gate, name, pass, detail = '', severity = 'error') => checks.push({gate, name, pass: !!pass, severity, detail});

// ---------------------------------------------------------------- Content QA
const hook = reel.hooks[reel.selectedHook];
const hookWords = hook.text.split(/\s+/).length;
const todos = (JSON.stringify(reel).match(/TODO:/g) ?? []).length;
add('content', 'No TODO placeholders left', todos === 0, todos ? `${todos} placeholder(s)` : '');
const limitIssues = checkLimits(reel);
add('content', 'Copy and structure fit the layout limits', limitIssues.length === 0, limitIssues.join(' | '));
add('content', 'Three hook variants generated', reel.hooks.length >= 3, `${reel.hooks.length} variants`);
add('content', 'Selected hook is short enough to read in ~2s', hookWords <= 10, `${hookWords} words`);
add('content', 'First scene is the hook', reel.scenes[0]?.type === 'hook');
add('content', 'Core insight stated in one sentence', reel.coreInsight && reel.coreInsight.split(/[.!?](\s|$)/).filter((s) => s && s.trim()).length <= 1, reel.coreInsight);
add('content', 'Duration within 15–35s', expectedSec >= 15 && expectedSec <= 35, `${expectedSec.toFixed(1)}s`, 'warning');
const shortScenes = reel.scenes.filter((s) => s.durationInFrames < reel.fps * 1.5);
add('content', 'No scene shorter than 1.5s', shortScenes.length === 0, shortScenes.map((s) => s.id).join(', '));

const takeaway = reel.scenes.find((s) => s.type === 'takeaway');
add('content', 'Exactly one on-screen CTA, matching primaryCta', takeaway && takeaway.cta === reel.primaryCta.text, takeaway?.cta ?? 'no takeaway scene');
const ctaVerbs = ['save', 'share', 'follow', 'comment'];
const ctaHits = ctaVerbs.filter((v) => new RegExp(`\\b${v}\\b`, 'i').test(reel.caption.cta));
add('content', 'Caption asks for one action only', ctaHits.length <= 1, `CTA verbs found: ${ctaHits.join(', ') || 'none'}`);

const illustrative = reel.claims.filter((c) => c.kind === 'illustrative');
if (illustrative.length) {
  const labelled = reel.scenes.some((s) => s.illustrativeLabel || /illustrative/i.test(JSON.stringify([s.kicker ?? '', s.lines ?? '', s.headline ?? '', s.title ?? '', (s.lines ?? []).map?.((l) => l.text) ?? ''])));
  add('content', 'Illustrative numbers labelled on screen', labelled);
  add('content', 'Illustrative numbers labelled in caption', /illustrative/i.test(reel.caption.body.join(' ')));
}
const unsourced = reel.claims.filter(
  (c) => c.kind === 'verified-fact' && (!(c.sources ?? []).length || !c.sources.every((s) => s.url && s.accessed)),
);
add('content', 'Every verified-fact claim has a dated source', unsourced.length === 0, unsourced.map((c) => c.text).join(' | '));

const banned = ['game-changer', 'game changer', 'revolutionary', "you won't believe", 'the future is here', 'changing everything', '10x', 'guaranteed', 'secret hack', 'mind-blowing'];
const allCopy = JSON.stringify({s: reel.scenes, c: reel.caption, h: hook.text}).toLowerCase();
const hype = banned.filter((b) => allCopy.includes(b));
add('content', 'No hype / bait phrases', hype.length === 0, hype.join(', '));
add('content', 'Hashtags: small relevant set (3–8)', reel.caption.hashtags.length >= 3 && reel.caption.hashtags.length <= 8, `${reel.caption.hashtags.length}`);
const capLen = [reel.caption.opening, ...reel.caption.body, reel.caption.cta, reel.caption.hashtags.join(' ')].join('\n\n').length;
add('content', 'Caption under Instagram 2,200-char limit', capLen <= 2200, `${capLen} chars`);
const coverWords = reel.cover.headline.map((l) => l.text).join(' ').split(/\s+/).length;
add('content', 'Cover headline 3–7 words', coverWords >= 3 && coverWords <= 7, `${coverWords} words`);

// ------------------------------------------------------- Visual layout QA
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, {cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts});

if (!contentOnly) {
  // Frames where each scene is fully revealed (8 frames before its end) and mid-scene.
  const sample = [...new Set(timings.flatMap((t) => [Math.floor((t.startFrame + t.endFrame) / 2), t.endFrame - 8]))];
  const layoutOut = path.join(qaDir, 'layout.json');
  const r = run('node', ['scripts/local-render/render.mjs', 'layout-check', id, layoutOut, '--frames', sample.join(',')]);
  if (r.status === 0) {
    const res = JSON.parse(fs.readFileSync(layoutOut, 'utf8'));
    const issues = res.results.flatMap((x) => x.issues.map((i) => ({frame: x.frame, ...i})));
    add('visual', 'All visible text inside Instagram safe zone', !issues.some((i) => i.type === 'outside-safe-zone'), issues.filter((i) => i.type === 'outside-safe-zone').map((i) => `f${i.frame} "${i.text}"`).join('; '));
    add('visual', 'No truncated/clipped text', !issues.some((i) => i.type === 'truncated-text'), issues.filter((i) => i.type === 'truncated-text').map((i) => `f${i.frame} "${i.text}"`).join('; '));
  } else {
    add('visual', 'Layout check ran', false, (r.stderr || r.stdout).slice(-400));
  }
  const rc = run('node', ['scripts/local-render/render.mjs', 'layout-check', id, path.join(qaDir, 'layout-cover.json'), '--frames', '0', '--cover', '1']);
  if (rc.status === 0) {
    const res = JSON.parse(fs.readFileSync(path.join(qaDir, 'layout-cover.json'), 'utf8'));
    const n = res.results[0].issues.length;
    add('visual', 'Cover text inside centred 1080×1350 feed crop', n === 0, n ? JSON.stringify(res.results[0].issues) : '');
  }
}

// ---------------------------------------------------------- Technical QA
const mp4 = path.join(OUT.reels, `${id}.mp4`);
const cover = path.join(OUT.covers, `${id}.png`);
if (!contentOnly && !preRender) {
  if (!fs.existsSync(mp4)) {
    add('technical', 'Reel MP4 exists', false, path.relative(ROOT, mp4));
  } else {
    const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', mp4]).stdout);
    const v = probe.streams.find((s) => s.codec_type === 'video');
    const a = probe.streams.find((s) => s.codec_type === 'audio');
    // Picture length is what must match; audio may carry a few ms of AAC padding.
    const dur = Number(v.duration ?? probe.format.duration);
    add('technical', 'Resolution 1080×1920', v.width === 1080 && v.height === 1920, `${v.width}×${v.height}`);
    add('technical', 'Frame rate 30 fps', v.r_frame_rate === '30/1', v.r_frame_rate);
    add('technical', 'Video codec H.264, yuv420p', v.codec_name === 'h264' && v.pix_fmt === 'yuv420p', `${v.codec_name} ${v.pix_fmt} ${v.profile}`);
    add('technical', 'Frame count matches composition', Number(v.nb_frames) === frames, `${v.nb_frames} vs ${frames}`);
    add('technical', 'Duration matches composition (±0.1s)', Math.abs(dur - expectedSec) <= 0.1, `${dur.toFixed(2)}s vs ${expectedSec.toFixed(2)}s`);
    if (reel.audio.bed || reel.audio.voiceover) {
      add('technical', 'Audio AAC 48 kHz stereo', a && a.codec_name === 'aac' && a.sample_rate === '48000' && a.channels === 2, a ? `${a.codec_name} ${a.sample_rate} ${a.channels}ch` : 'no audio stream');
      const eb = run('ffmpeg', ['-hide_banner', '-nostats', '-i', mp4, '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr;
      const I = Number((eb.match(/I:\s+(-?[\d.]+) LUFS/g) ?? []).pop()?.match(/-?[\d.]+/)[0]);
      const tp = Number((eb.match(/Peak:\s+(-?[\d.]+) dBFS/g) ?? []).pop()?.match(/-?[\d.]+/)[0]);
      add('technical', 'Integrated loudness in −20…−12 LUFS', I >= -20 && I <= -12, `${I} LUFS`);
      add('technical', 'True peak ≤ −1.0 dBTP (no clipping)', tp <= -1.0, `${tp} dBTP`);
    }
    // Instagram Reels container/codec requirements.
    const head = Buffer.alloc(Math.min(fs.statSync(mp4).size, 4 * 1024 * 1024));
    const fd = fs.openSync(mp4, 'r');
    fs.readSync(fd, head, 0, head.length, 0);
    fs.closeSync(fd);
    const moovAt = head.indexOf('moov');
    const mdatAt = head.indexOf('mdat');
    add('technical', 'IG: moov atom at front of file (faststart)', moovAt >= 0 && (mdatAt < 0 || moovAt < mdatAt), `moov@${moovAt} mdat@${mdatAt}`);
    add('technical', 'IG: no MP4 edit lists', head.indexOf('elst') < 0 || head.indexOf('elst') > (mdatAt < 0 ? Infinity : mdatAt), head.indexOf('elst') >= 0 && head.indexOf('elst') < (mdatAt < 0 ? Infinity : mdatAt) ? 'edit list found' : '');
    const vbr = Number(v.bit_rate ?? 0);
    add('technical', 'IG: video bitrate ≤ 25 Mbps', vbr > 0 && vbr <= 25e6, `${(vbr / 1e6).toFixed(2)} Mbps`);
    if (a) add('technical', 'IG: audio bitrate ≈128 kbps', Number(a.bit_rate) <= 140000, `${Math.round(Number(a.bit_rate) / 1000)} kbps`);
    add('technical', 'IG: file size ≤ 300 MB', fs.statSync(mp4).size <= 300 * 1024 * 1024, `${(fs.statSync(mp4).size / 1048576).toFixed(1)} MB`);
    const jpg = path.join(OUT.covers, `${id}.jpg`);
    add('technical', 'IG: JPEG cover ≤ 8 MB', fs.existsSync(jpg) && fs.statSync(jpg).size <= 8 * 1024 * 1024, fs.existsSync(jpg) ? `${(fs.statSync(jpg).size / 1024).toFixed(0)} KB` : 'missing');
    const dec = run('ffmpeg', ['-v', 'error', '-i', mp4, '-f', 'null', '-']);
    add('technical', 'Full decode with zero errors (file plays)', dec.status === 0 && !dec.stderr.trim(), dec.stderr.trim().slice(0, 300));
    const bd = run('ffmpeg', ['-hide_banner', '-i', mp4, '-vf', 'blackdetect=d=0.2:pix_th=0.02', '-an', '-f', 'null', '-']).stderr;
    add('technical', 'No black frames/gaps', !/black_start/.test(bd), (bd.match(/black_start:\S+ black_end:\S+/g) ?? []).join(', '));

    // Review frames: first, last, every scene mid, and both sides of every cut.
    const picks = new Map([[0, 'first'], [frames - 1, 'last']]);
    timings.forEach((t, i) => {
      picks.set(Math.floor((t.startFrame + t.endFrame) / 2), `s${i + 1}-mid`);
      if (i > 0) {
        picks.set(t.startFrame - 2, `s${i}-out`);
        picks.set(t.startFrame + 3, `s${i + 1}-in`);
      }
    });
    fs.readdirSync(path.join(qaDir, 'frames')).forEach((f) => fs.unlinkSync(path.join(qaDir, 'frames', f)));
    const sorted = [...picks.entries()].sort((x, y) => x[0] - y[0]);
    // Exact frame selection by index (seeking can miss the final frame).
    const tmpPattern = path.join(qaDir, 'frames', 'tmp-%03d.png');
    const select = sorted.map(([f]) => `eq(n\\,${f})`).join('+');
    run('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', `select='${select}'`, '-fps_mode', 'passthrough', tmpPattern]);
    sorted.forEach(([f, label], i) => {
      const tmp = path.join(qaDir, 'frames', `tmp-${String(i + 1).padStart(3, '0')}.png`);
      if (fs.existsSync(tmp)) fs.renameSync(tmp, path.join(qaDir, 'frames', `${String(f).padStart(4, '0')}-${label}.png`));
    });
    const files = fs.readdirSync(path.join(qaDir, 'frames')).filter((f) => f.endsWith('.png')).sort();
    add('technical', 'Review frames extracted from final MP4', files.length === sorted.length, `${files.length} frames`);
    const cols = 6;
    const sheet = run('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(qaDir, 'frames', '*.png'), '-vf', `scale=270:480,tile=${cols}x${Math.ceil(files.length / cols)}:padding=6:color=0x222222`, '-frames:v', '1', path.join(qaDir, 'contact-sheet.png')]);
    add('technical', 'Contact sheet built', sheet.status === 0, path.relative(ROOT, path.join(qaDir, 'contact-sheet.png')));
  }
  if (fs.existsSync(cover)) {
    const cp = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', cover]).stdout).streams[0];
    add('technical', 'Cover 1080×1920 PNG', cp.width === 1080 && cp.height === 1920, `${cp.width}×${cp.height}`);
  } else add('technical', 'Cover exists', false);
  const deps = ['public/fonts/InterDisplay-Bold.otf', 'public/fonts/Inter-Medium.otf', 'public/fonts/DejaVuSansMono-Bold.ttf', reel.audio.bed && `public/${reel.audio.bed}`].filter(Boolean);
  const missing = deps.filter((d) => !fs.existsSync(path.join(ROOT, d)));
  add('technical', 'All local asset dependencies present', missing.length === 0, missing.join(', '));
}

// ----------------------------------------------------------------- Report
const errors = checks.filter((c) => !c.pass && c.severity === 'error');
const warnings = checks.filter((c) => !c.pass && c.severity === 'warning');
const manualPending = [
  'Watch the full MP4 at normal speed on a phone (pacing, readability, transitions).',
  'Listen to the final audio on headphones and a phone speaker (mix, no harshness).',
  'Read the caption once more in Instagram\'s composer before posting.',
];
const status = errors.length ? 'failed' : contentOnly ? 'content-passed' : preRender ? 'pre-render-passed' : 'automated-passed';
const report = {contentId: id, ranAt: new Date().toISOString(), status, errors: errors.length, warnings: warnings.length, checks, manualChecksPending: manualPending};
fs.writeFileSync(path.join(qaDir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
const md = [
  `# QA report — ${id}`,
  '',
  `Status: **${status}** · ${checks.length - errors.length - warnings.length}/${checks.length} passed · ${errors.length} error(s) · ${warnings.length} warning(s)`,
  '',
  '| Gate | Check | Result | Detail |',
  '|---|---|---|---|',
  ...checks.map((c) => `| ${c.gate} | ${c.name} | ${c.pass ? '✅' : c.severity === 'warning' ? '⚠️' : '❌'} | ${String(c.detail).replace(/\|/g, '/').replace(/\n/g, ' ')} |`),
  '',
  '## Manual checks still required before approval',
  ...manualPending.map((m) => `- [ ] ${m}`),
];
fs.writeFileSync(path.join(qaDir, 'report.md'), md.join('\n') + '\n');

const metaPath = path.join(OUT.metadata, `${id}.json`);
const meta = contentOnly || preRender ? null : readJsonIfExists(metaPath);
if (meta) {
  meta.qa = {status, ranAt: report.ranAt, errors: errors.length, warnings: warnings.length, report: `output/qa/${id}/report.md`, manualChecks: {status: 'pending', items: manualPending}};
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
} else if (!contentOnly && !preRender) {
  console.warn('No metadata yet — run `npm run package -- <id>` to create it.');
}
if (status === 'automated-passed' && reel.status === 'rendered') {
  reel.status = 'qa-passed';
  saveReel(reel);
}

if (jsonOut) {
  console.log(JSON.stringify(report));
  process.exit(errors.length ? 1 : 0);
}
for (const c of checks) console.log(`${c.pass ? 'PASS' : c.severity === 'warning' ? 'WARN' : 'FAIL'}  [${c.gate}] ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
console.log(`\n${status.toUpperCase()}: ${errors.length} error(s), ${warnings.length} warning(s). Report: output/qa/${id}/report.md`);
process.exit(errors.length ? 1 : 0);
