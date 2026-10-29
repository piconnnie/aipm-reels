# Storyboard — aipm-012-50-pilots-one-platform

**Topic:** Why enterprises build an AI platform layer instead of many separate pilots  
**Pillar:** D: Enterprise AI · **Format:** architecture · **Objective:** shares · **Depth:** intermediate  
**Audience:** Enterprise AI leaders and platform PMs  
**Duration:** 20.6s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** A shared platform layer — access control, logging, evals and model routing — makes each new AI use case cheaper, but build it after a few real pilots, not before.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | 50 pilots, 50 rebuilt basics. | Specific professional mistake | 4 | 5 | 4 | 5 | 4 | **22** |
| 2 | Your AI pilots are paying the same bill 50 times. | Counterintuitive insight | 4 | 4 | 5 | 4 | 4 | **21** |
| 3 | Why AI platforms beat AI pilots at scale. | A vs B | 3 | 4 | 3 | 4 | 5 | **19** |

**Selected:** "50 pilots, 50 rebuilt basics." — Highest total (22/25): the pattern is recognisable to the audience and the reel adds the honest trade-off on timing.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** 50 pilots, 50 rebuilt basics. / Why platforms win at scale.
- **Voiceover (if enabled):** Fifty pilots, fifty rebuilt basics.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. layer — 0:03.0 → 0:10.7 (7.7s, frames 90–319)

- **Purpose:** Show the shared layer and its timing trade-off.
- **On-screen copy:** THE SHARED LAYER / Build once. Reuse it. / Use case apps → Access control → Logging + evals → Model routing → Models + data / Trade-off: build it after 2–3 real use cases, not before.
- **Voiceover (if enabled):** Use-case apps sit on a shared layer: access control, logging and evals, model routing, approved models and data. Build it after two or three real use cases, not before.
- **Visual composition:** Vertical pipeline of 5 nodes with flow pulse; amber callout on node 1.
- **Animation:** Nodes every 18 frames from 20; callout at 140.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.77s, tick @ 4.37s, tick @ 4.97s, tick @ 5.57s, tick @ 6.17s, low @ 7.73s

### 3. reuse — 0:10.7 → 0:15.6 (4.9s, frames 320–467)

- **Purpose:** Make the saving concrete.
- **On-screen copy:** EACH PILOT STOPS… / What teams stop rebuilding / REUSED Access and permissions · REUSED Logging and audit trail · REUSED Eval and safety checks
- **Voiceover (if enabled):** Each new use case stops rebuilding access, logging and audit, and eval and safety checks.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 24 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.67s, tick @ 11.20s, tick @ 12.00s, tick @ 12.80s

### 4. takeaway — 0:15.6 → 0:20.6 (5.0s, frames 468–617)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Pilot to learn. Platform to scale. / Share this with your AI platform team
- **Voiceover (if enabled):** Pilot to learn. Platform to scale. Share this with your AI platform team.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 15.60s, chime @ 18.00s

## Voiceover edit plan

Full narration is 62 words ≈ 23.8s at a conversational 2.6 words/sec, versus 20.6s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 1.9 | yes |
| layer | 7.7 | 11.2 | no — extend by ~4.0s |
| reuse | 4.9 | 5.8 | no — extend by ~1.3s |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **practitioner-opinion** — A shared AI platform layer reduces the marginal cost of new use cases; building it after a few pilots reduces the risk of solving the wrong problems.
