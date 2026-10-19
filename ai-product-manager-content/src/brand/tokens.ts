// Single source of truth for the AI Product Manager visual system.
// Change values here, never inline in scenes.
//
// Palettes share one set of role names (kept from the original navy theme):
//   navy        background          navyRaised  cards / panels
//   navyLine    borders, tracks     indigo      primary accent (bars, underline)
//   cyan        highlight (key words, icons)
//   offWhite    primary text        slate       secondary text
//   success / warning  status colours
//   deep        terminal / inset background
// Components read the active palette with useColors() (src/brand/theme.tsx).

export type Palette = {
  navy: string;
  navyRaised: string;
  navyLine: string;
  indigo: string;
  cyan: string;
  offWhite: string;
  slate: string;
  success: string;
  warning: string;
  deep: string;
  /** Background texture for this theme. */
  pattern: 'grid' | 'dots' | 'diagonal' | 'rings' | 'waves';
  /** Strength of the background glow (0–1). */
  glow: number;
  light?: boolean;
};

export const themes = {
  // The original brand look: deep navy, indigo + cyan.
  midnight: {
    navy: '#0B1020', navyRaised: '#131A30', navyLine: '#232C47', indigo: '#5B5CF0', cyan: '#55D6FF',
    offWhite: '#F5F7FB', slate: '#8B95A7', success: '#6EE7B7', warning: '#FFC66D', deep: '#070B16',
    pattern: 'grid', glow: 0.2,
  },
  // Warm charcoal with orange + amber.
  ember: {
    navy: '#150D0B', navyRaised: '#22150F', navyLine: '#3B261C', indigo: '#FF6B3D', cyan: '#FFC24B',
    offWhite: '#FFF5EC', slate: '#B49F92', success: '#7FE0A8', warning: '#FF8A80', deep: '#0D0806',
    pattern: 'diagonal', glow: 0.24,
  },
  // Deep green with emerald + lime.
  mint: {
    navy: '#06130E', navyRaised: '#0D2118', navyLine: '#1C3A2C', indigo: '#22C27A', cyan: '#C2F25C',
    offWhite: '#F0FBF4', slate: '#8EA99A', success: '#5EEAD4', warning: '#FFC66D', deep: '#030C08',
    pattern: 'dots', glow: 0.2,
  },
  // Aubergine with violet + hot pink.
  grape: {
    navy: '#12091F', navyRaised: '#1D1131', navyLine: '#35224F', indigo: '#A35BFF', cyan: '#FF6FB5',
    offWhite: '#FBF5FF', slate: '#A79CBC', success: '#6EE7B7', warning: '#FFC66D', deep: '#0A0514',
    pattern: 'rings', glow: 0.26,
  },
  // Deep teal with sky blue + aqua.
  ocean: {
    navy: '#04141B', navyRaised: '#0A2230', navyLine: '#173849', indigo: '#1E9BFF', cyan: '#4FF0D2',
    offWhite: '#EFFAFF', slate: '#88A3B1', success: '#86EFAC', warning: '#FDBA74', deep: '#020C11',
    pattern: 'waves', glow: 0.22,
  },
  // Light theme: warm paper, ink text, indigo + tomato.
  paper: {
    navy: '#F5F1E8', navyRaised: '#FFFFFF', navyLine: '#E0D9CA', indigo: '#4338CA', cyan: '#D9481F',
    offWhite: '#15171F', slate: '#5A6070', success: '#13803F', warning: '#B45309', deep: '#FBF8F2',
    pattern: 'grid', glow: 0.12, light: true,
  },
} satisfies Record<string, Palette>;

export type ThemeId = keyof typeof themes;

/** Default palette (the original look). Prefer useColors() inside components. */
export const colors: Palette = themes.midnight;

/** '#RRGGBB' + alpha → 'rgba(r,g,b,a)'. */
export const alpha = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export type Tone = 'neutral' | 'success' | 'warning' | 'accent';

export const toneColors = (p: Palette): Record<Tone, string> => ({
  neutral: p.slate,
  success: p.success,
  warning: p.warning,
  accent: p.cyan,
});

/** Tone colours of the default palette. Prefer useToneColor() inside components. */
export const toneColor = toneColors(colors);

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
