// Shared helpers for the pipeline scripts (plain Node, no dependencies).
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REELS_DIR = path.join(ROOT, 'src', 'content', 'reels');
export const OUT = {
  reels: path.join(ROOT, 'output', 'reels'),
  covers: path.join(ROOT, 'output', 'covers'),
  captions: path.join(ROOT, 'output', 'captions'),
  metadata: path.join(ROOT, 'output', 'metadata'),
  storyboards: path.join(ROOT, 'output', 'storyboards'),
  qa: path.join(ROOT, 'output', 'qa'),
};

export const reelPath = (id) => path.join(REELS_DIR, `${id}.json`);
export const loadReel = (id) => {
  const p = reelPath(id);
  if (!fs.existsSync(p)) throw new Error(`No content file for "${id}" at ${path.relative(ROOT, p)}`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};
export const saveReel = (reel) => fs.writeFileSync(reelPath(reel.id), JSON.stringify(reel, null, 2) + '\n');

export const listReels = () =>
  fs.readdirSync(REELS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));

export const sceneTimings = (reel) => {
  let t = 0;
  return reel.scenes.map((s) => {
    const start = t;
    t += s.durationInFrames;
    return {id: s.id, type: s.type, startFrame: start, endFrame: t, startSec: +(start / reel.fps).toFixed(2), endSec: +(t / reel.fps).toFixed(2)};
  });
};

export const totalFrames = (reel) => reel.scenes.reduce((a, s) => a + s.durationInFrames, 0);

export const ensureDir = (d) => fs.mkdirSync(d, {recursive: true});

export const readJsonIfExists = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null);

export const fmtTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(1).padStart(4, '0');
  return `${m}:${s}`;
};

export const srtTime = (sec) => {
  const ms = Math.round(sec * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${s},${String(ms % 1000).padStart(3, '0')}`;
};

export const reelIdArg = () => {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: node <script> <reelId>');
    console.error('Available:', listReels().join(', '));
    process.exit(2);
  }
  return id;
};
