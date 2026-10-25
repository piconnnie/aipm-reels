# Storyboard — aipm-011-why-agents-fail-at-scale

**Topic:** Your agent demo succeeded 9 times. Why it still fails in production  
**Pillar:** C: Agentic AI · **Format:** poc-to-production · **Objective:** shares · **Depth:** intermediate  
**Audience:** PMs and engineers building multi-step agents  
**Duration:** 17.73s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Per-step reliability multiplies across long tasks, so evaluate end-to-end task success over many runs instead of trusting a few successful demos.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | 9 perfect demos. Still not ready. | Concrete before-and-after | 4 | 5 | 5 | 4 | 5 | **23** |
| 2 | Agents don’t fail at a step. They fail at the sum. | Counterintuitive insight | 3 | 5 | 4 | 5 | 3 | **20** |
| 3 | The math that breaks long agent tasks. | Curiosity gap | 3 | 4 | 4 | 4 | 4 | **19** |

**Selected:** "9 perfect demos. Still not ready." — Highest total (23/25): concrete, intriguing, and the reel backs it with a labelled illustrative calculation.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** 9 perfect demos. Still not ready. / Here’s the math.
- **Voiceover (if enabled):** Nine perfect demos. Still not ready. Here's the math.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. demo — 0:03.0 → 0:07.2 (4.2s, frames 90–216)

- **Purpose:** Show a demo where each step works.
- **On-screen copy:** THE DEMO / Every step worked. / STEP 1 Read the request · STEP 2 Find the record · STEP 3 Update the system · STEP 4 Send the reply
- **Voiceover (if enabled):** In the demo, every step worked: read the request, find the record, update the system, send the reply.
- **Visual composition:** Kicker + headline; 4 tagged cards.
- **Animation:** Cards pop every 14 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s, tick @ 4.93s

### 3. math — 0:07.2 → 0:12.7 (5.5s, frames 217–381)

- **Purpose:** Show how per-step reliability compounds (labelled illustrative).
- **On-screen copy:** WHY IT BREAKS [ILLUSTRATIVE] / ONE STEP 95% / 10 STEPS IN A ROW 60% / Errors compound.
- **Voiceover (if enabled):** Illustrative math: if each step succeeds ninety-five percent of the time, ten steps in a row succeed about sixty percent of the time. Errors compound.
- **Visual composition:** Badge; two metric cards with bars; conclusion.
- **Animation:** Left at 4, right at 30 with count-up; conclusion at 84.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 7.23s, tick @ 7.57s, low @ 8.43s, impact @ 10.10s

### 4. takeaway — 0:12.7 → 0:17.7 (5.0s, frames 382–531)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Test the whole task, not one step. / Share this with your agent team
- **Voiceover (if enabled):** Test the whole task, not one step. Share this with your agent team.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 12.73s, chime @ 15.13s

## Voiceover edit plan

Full narration is 65 words ≈ 25.0s at a conversational 2.6 words/sec, versus 17.73s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 3.5 | no — extend by ~1.0s |
| demo | 4.2 | 6.9 | no — extend by ~3.2s |
| math | 5.5 | 9.6 | no — extend by ~4.6s |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **illustrative** — 95% per-step success over 10 independent steps ≈ 60% end-to-end (0.95^10 ≈ 0.599).
- **practitioner-opinion** — Agent reliability should be evaluated end to end over many runs rather than inferred from successful demos.
