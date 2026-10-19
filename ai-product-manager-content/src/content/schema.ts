// Content configuration schema. Every reel is a JSON file in src/content/reels
// that conforms to ReelConfig. Rendering logic never hardcodes copy.

import type {Tone} from '../brand/tokens';

export type SfxKind = 'whoosh' | 'tick' | 'chime' | 'low' | 'impact';

export interface SfxCue {
  /** Frame relative to the start of the scene. */
  at: number;
  kind: SfxKind;
}

export interface Storyboard {
  visual: string;
  animation: string;
}

export interface HeadlineLine {
  text: string;
  highlight?: boolean;
}

interface SceneBase {
  id: string;
  durationInFrames: number;
  /** What this scene does for the viewer (information or emotional purpose). */
  purpose: string;
  /** On-screen copy summary used in the storyboard and subtitles file. */
  onScreen: string;
  /** Narration for this scene, if voiceover is enabled. */
  voiceover?: string;
  storyboard: Storyboard;
  transitionIn?: 'fade-up' | 'cut';
  sfx?: SfxCue[];
}

export interface HookScene extends SceneBase {
  type: 'hook';
  kicker?: string;
  lines: HeadlineLine[];
  sub?: string;
}

export interface CardItem {
  text: string;
  status: 'pass' | 'warn' | 'unknown';
  tag?: string;
  /** If set, the card flips to this content at swapStart + index * swapStagger. */
  swap?: {text: string; tag: string; status: 'pass' | 'warn' | 'unknown'};
}

export interface CardsScene extends SceneBase {
  type: 'cards';
  kicker: string;
  headline: HeadlineLine[];
  cards: CardItem[];
  enter: 'pop' | 'static';
  popStart?: number;
  popStagger?: number;
  swapStart?: number;
  swapStagger?: number;
  metric?: {
    label: string;
    value: string;
    tone: Tone;
    appearAt: number;
    swapTo?: {label: string; value: string; tone: Tone; at: number};
  };
}

export interface TableScene extends SceneBase {
  type: 'table';
  kicker: string;
  headline: HeadlineLine[];
  columns: [string, string, string];
  rows: {input: string; expected: string; passIf: string}[];
  rowStart: number;
  rowStagger: number;
  notes: string[];
  notesStart: number;
  notesStagger: number;
}

export interface ComparisonScene extends SceneBase {
  type: 'comparison';
  kicker: string;
  illustrativeLabel?: string;
  left: {label: string; value: string; ratio: number; tone: Tone; caption: string};
  right: {label: string; value: string; ratio: number; tone: Tone; caption: string};
  rightAt: number;
  conclusion: HeadlineLine[];
  conclusionAt: number;
}

export interface ChecklistScene extends SceneBase {
  type: 'checklist';
  kicker: string;
  headline: HeadlineLine[];
  items: string[];
  itemStart: number;
  itemStagger: number;
  rule?: string;
}

export interface DiagramScene extends SceneBase {
  type: 'diagram';
  kicker: string;
  headline: HeadlineLine[];
  nodes: {label: string; detail?: string; tone?: Tone}[];
  nodeStart: number;
  nodeStagger: number;
  callout?: {nodeIndex: number; text: string; at: number};
}

export interface TerminalScene extends SceneBase {
  type: 'terminal';
  kicker: string;
  headline: HeadlineLine[];
  title: string;
  lines: {text: string; tone?: Tone; at: number}[];
  charsPerFrame: number;
}

export interface TakeawayScene extends SceneBase {
  type: 'takeaway';
  lines: HeadlineLine[];
  cta: string;
  ctaAt: number;
  endCardAt: number;
}

export type Scene =
  | HookScene
  | CardsScene
  | TableScene
  | ComparisonScene
  | ChecklistScene
  | DiagramScene
  | TerminalScene
  | TakeawayScene;

export type Pillar =
  | 'A: AI Product Management'
  | 'B: GenAI Product Delivery'
  | 'C: Agentic AI'
  | 'D: Enterprise AI'
  | 'E: AI Product Career'
  | 'F: AI Tools and Experiments';

export type FormatId =
  | 'mistake'
  | 'framework'
  | 'a-vs-b'
  | 'architecture'
  | 'poc-to-production'
  | 'interview'
  | 'build-with-me'
  | 'myth-vs-reality'
  | 'teardown'
  | 'decision-checklist';

export interface HookOption {
  text: string;
  angle: string;
  scores: {specificity: number; relevance: number; curiosity: number; credibility: number; comprehension: number};
  notes: string;
}

export interface ReelConfig {
  id: string;
  version: number;
  status: 'draft' | 'rendered' | 'qa-passed' | 'approved' | 'published';
  brief: {
    topic: string;
    audience: string;
    pillar: Pillar;
    objective: 'reach' | 'saves' | 'shares' | 'follows' | 'authority';
    format: FormatId;
    targetDurationSec: number;
    technicalDepth: 'beginner' | 'intermediate' | 'advanced';
    voiceover: boolean;
    research: 'required' | 'not-required';
    constraints: string[];
  };
  coreInsight: string;
  hooks: HookOption[];
  selectedHook: number;
  selectionRationale: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
  cover: {kicker: string; headline: HeadlineLine[]};
  caption: {opening: string; body: string[]; cta: string; hashtags: string[]};
  primaryCta: {type: 'save' | 'share' | 'follow' | 'question'; text: string};
  /** Look and sound of this reel; omitted fields rotate by reel number (src/brand/theme.tsx). */
  style?: {theme?: import('../brand/tokens').ThemeId; music?: import('../brand/theme').MusicId; motion?: import('../brand/theme').MotionId};
  audio: {bed: string | null; bedVolume: number; voiceover: string | null; voiceoverVolume: number};
  claims: {text: string; kind: 'verified-fact' | 'practitioner-opinion' | 'illustrative'; sources: {url: string; accessed: string}[]}[];
  publish: {suggestedDate: string; notes: string};
  repurposing: {carousel: string[]; followUpReel: string; linkedin: string};
}
