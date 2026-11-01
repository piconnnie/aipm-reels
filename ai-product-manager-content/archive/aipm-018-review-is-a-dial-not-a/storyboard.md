# Storyboard — aipm-018-review-is-a-dial-not-a

**Topic:** Human-in-the-loop is a dial, not a switch  
**Pillar:** A: AI Product Management · **Format:** framework · **Objective:** saves · **Depth:** beginner  
**Audience:** PMs designing review steps for AI features  
**Duration:** 24.67s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Human review has levels — review all, review risky, sample, audit — and you set the level per task, moving down only when reviewers rarely change the AI’s output.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Human review is a dial, not a switch. | Reframe | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | “Keep a human in the loop” isn’t a plan. | Common misconception | 3 | 5 | 4 | 4 | 4 | **20** |
| 3 | When can you stop reviewing AI output? | Question | 4 | 5 | 4 | 4 | 5 | **22** |

**Selected:** "Human review is a dial, not a switch." — Highest total (23/25): one memorable image (a dial) that the checklist turns into four concrete settings and one metric.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Human review is a dial, not a switch. / Four settings, and when to move.
- **Voiceover (if enabled):** Human review is a dial, not a switch. Four settings, and when to move between them.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. levels — 0:03.0 → 0:13.0 (10.0s, frames 90–389)

- **Purpose:** Name the four levels and the metric that moves you between them.
- **On-screen copy:** THE REVIEW DIAL / Four settings, one metric. / Review all: a person approves every output · Review risky: only flagged or high-stakes cases · Sample: check a random slice each week · Audit: review logs after incidents / Move down a level only when reviewers rarely change outputs.
- **Voiceover (if enabled):** Review all. Review only risky cases. Sample a random slice. Audit after incidents. Move down a level only when reviewers rarely change the output.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.30s, tick @ 6.70s, tick @ 8.10s, chime @ 9.73s

### 3. example — 0:13.0 → 0:19.7 (6.7s, frames 390–589)

- **Purpose:** Worked example: one feature, different settings per task.
- **On-screen copy:** EXAMPLE: SUPPORT REPLIES / Same feature, different settings. / HIGH STAKES Refund promises → review all · MEDIUM Policy answers → review risky · LOW How-to answers → sample · TRIVIAL Greetings → audit only
- **Voiceover (if enabled):** In one support assistant: refund promises get reviewed every time, policy answers when flagged, how-to answers by sample, greetings only in audits.
- **Visual composition:** Kicker + headline; 4 tagged cards.
- **Animation:** Cards pop every 26 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 13.00s, tick @ 13.53s, tick @ 14.40s, tick @ 15.27s, tick @ 16.13s

### 4. takeaway — 0:19.7 → 0:24.7 (5.0s, frames 590–739)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Set the dial per task, not per product. / Save this to set your review levels
- **Voiceover (if enabled):** Set the dial per task, not per product. Save this to set your review levels.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 19.67s, chime @ 22.07s

## Voiceover edit plan

Full narration is 77 words ≈ 29.6s at a conversational 2.6 words/sec, versus 24.67s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 6.2 | no — extend by ~3.7s |
| levels | 10.0 | 9.2 | yes |
| example | 6.7 | 8.5 | no — extend by ~2.3s |
| takeaway | 5.0 | 5.8 | no — extend by ~1.3s |

## Claims register

- **practitioner-opinion** — Human review of AI output works best as graduated levels set per task, adjusted by how often reviewers change the output.
