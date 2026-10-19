// Single source of truth for the AI Product Manager visual system.
// Change values here, never inline in scenes.

export const colors = {
  navy: '#0B1020',
  navyRaised: '#131A30',
  navyLine: '#232C47',
  indigo: '#5B5CF0',
  cyan: '#55D6FF',
  offWhite: '#F5F7FB',
  slate: '#8B95A7',
  success: '#6EE7B7',
  warning: '#FFC66D',
} as const;

export type Tone = 'neutral' | 'success' | 'warning' | 'accent';

export const toneColor: Record<Tone, string> = {
  neutral: colors.slate,
  success: colors.success,
  warning: colors.warning,
  accent: colors.cyan,
};

// Font families are registered in fonts.ts from files in public/fonts.
// Display: Space Grotesk Bold is the target face; Inter Display Bold is the
// installed equivalent used until Space Grotesk files are added locally.
export const fonts = {
  display: "'AIPM Display', 'Space Grotesk', 'Inter Display', sans-serif",
  body: "'AIPM Body', 'Inter', sans-serif",
  mono: "'AIPM Mono', 'JetBrains Mono', 'DejaVu Sans Mono', monospace",
} as const;

export const type = {
  hook: 112,
  headline: 76,
  body: 46,
  card: 40,
  label: 28,
  metric: 120,
} as const;

// Reel canvas and Instagram-safe zone (conservative).
// Top ~230px: Reels header/camera. Bottom ~420px: caption, audio, CTA chrome.
// Right ~150px: like/comment/share rail.
export const canvas = {
  width: 1080,
  height: 1920,
  fps: 30,
};

export const safe = {
  top: 250,
  bottom: 420,
  left: 96,
  right: 150,
};

export const safeBox = {
  x: safe.left,
  y: safe.top,
  width: canvas.width - safe.left - safe.right,
  height: canvas.height - safe.top - safe.bottom,
};

// Feed grid crop for covers (profile grid shows a centred 3:4 / 4:5 region).
export const coverSafe = {
  width: 1080,
  height: 1350,
  y: (1920 - 1350) / 2,
};

export const radius = {card: 22, pill: 999};
