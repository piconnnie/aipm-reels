# Storyboard — aipm-033-chunk-by-structure-not-size

**Topic:** Chunking documents by fixed size  
**Pillar:** B: GenAI Product Delivery · **Format:** mistake · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers building RAG features  
**Duration:** 22.33s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Fixed-size chunks split tables, steps and rules from their exceptions, so chunk by document structure (headings, sections, whole tables) instead.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Fixed-size chunks break your RAG answers. | Specific professional mistake | 5 | 5 | 4 | 5 | 5 | **24** |
| 2 | Your chunker split the rule from its exception. | Curiosity gap | 4 | 5 | 5 | 4 | 4 | **22** |
| 3 | Stop chunking every 500 tokens. | Direct instruction | 4 | 4 | 3 | 4 | 5 | **20** |

**Selected:** "Fixed-size chunks break your RAG answers." — Highest total (24/25): names a concrete default, readable instantly, and the reel shows the fix side by side.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Fixed-size chunks break your RAG answers. / Chunk by structure instead.
- **Voiceover (if enabled):** Fixed-size chunks break your RAG answers.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. mistake — 0:03.0 → 0:07.7 (4.7s, frames 90–229)

- **Purpose:** Show what fixed-size chunking does to real documents.
- **On-screen copy:** THE MISTAKE / Split every 500 tokens. / SPLIT Table header in one chunk · SPLIT Rule here, exception there · SPLIT Steps lose their numbering
- **Voiceover (if enabled):** Split every five hundred tokens and the table header lands in one chunk, the rule and its exception in two, and the steps lose their order.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 24 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, low @ 3.53s, low @ 4.33s, low @ 5.13s

### 3. fix — 0:07.7 → 0:17.3 (9.7s, frames 230–519)

- **Purpose:** Show the better approach on the same documents (illustrative).
- **On-screen copy:** ILLUSTRATIVE EXAMPLES / Chunk by structure. / DOCUMENT → FIXED SIZE → BY STRUCTURE / Refund policy + exceptions → Exception dropped ✗ → Rule + exception ✓ · Pricing table → Rows lose headers ✗ → Whole table ✓ · Setup guide → Later steps missing ✗ → One section ✓ / Split on headings, not token counts · Prefix each chunk with its doc title
- **Voiceover (if enabled):** Illustrative examples. Chunk the refund policy by section and the exception stays with the rule. Keep tables whole. Keep each setup section together. Split on headings, and prefix each chunk with its document title.
- **Visual composition:** Legend DOCUMENT → FIXED SIZE → BY STRUCTURE; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 45 frames from 30; notes from 180.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 7.67s, tick @ 8.73s, tick @ 10.23s, tick @ 11.73s, tick @ 13.73s, tick @ 14.73s

### 4. takeaway — 0:17.3 → 0:22.3 (5.0s, frames 520–669)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Chunk by meaning, not by length. / Save this for your next RAG build
- **Voiceover (if enabled):** Chunk by meaning, not by length. Save this for your next RAG build.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 17.33s, chime @ 19.73s

## Voiceover edit plan

Full narration is 79 words ≈ 30.4s at a conversational 2.6 words/sec, versus 22.33s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 2.3 | yes |
| mistake | 4.7 | 10.0 | no — extend by ~5.8s |
| fix | 9.7 | 13.1 | no — extend by ~3.9s |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **practitioner-opinion** — Structure-aware chunking (by headings, sections and whole tables) usually retrieves more complete context than fixed-size chunking.
- **illustrative** — The refund policy, pricing table and setup guide examples are illustrative.
