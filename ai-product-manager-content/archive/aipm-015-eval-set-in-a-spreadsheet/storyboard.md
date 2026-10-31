# Storyboard — aipm-015-eval-set-in-a-spreadsheet

**Topic:** Build a 20-case eval set in a spreadsheet  
**Pillar:** F: AI Tools and Experiments · **Format:** build-with-me · **Objective:** saves · **Depth:** beginner  
**Audience:** PMs who want a hands-on first eval set  
**Duration:** 24.73s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** A useful first eval set is 20 real questions in a spreadsheet with expected behaviour and a pass rule, re-scored after every change.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | An eval set in a spreadsheet. | Immediately usable framework | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | You don’t need an eval platform to start. | Common misconception | 4 | 4 | 4 | 5 | 4 | **21** |
| 3 | 20 rows that tell you if your AI works. | Concrete promise | 4 | 5 | 5 | 3 | 4 | **21** |

**Selected:** "An eval set in a spreadsheet." — Highest total (23/25): concrete and doable, and the reel shows the columns, sample rows and a scored run.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** An eval set in a spreadsheet. / 20 rows. One afternoon.
- **Voiceover (if enabled):** An eval set in a spreadsheet. Twenty rows, one afternoon.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. columns — 0:03.0 → 0:12.7 (9.7s, frames 90–379)

- **Purpose:** Show the structure with an HR-assistant example.
- **On-screen copy:** THE COLUMNS / Three columns are enough. / INPUT → EXPECTED → PASS IF / How many leave days do I get? → Quote the policy → Matches handbook · Can you approve my leave? → Decline + route → Hands off to HR · what about part time ppl → Ask a clarifying Q → Asks before answering / Mix 10 common, 5 edge, 5 refuse · Re-score it after every change
- **Voiceover (if enabled):** Three columns: the input, the expected behaviour, and the pass rule. Mix ten common questions, five edge cases and five it should refuse. Re-score after every change.
- **Visual composition:** Legend INPUT → EXPECTED → PASS IF; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 45 frames from 30; notes from 180.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 4.07s, tick @ 5.57s, tick @ 7.07s, tick @ 9.07s, tick @ 10.07s

### 3. run — 0:12.7 → 0:19.7 (7.1s, frames 380–591)

- **Purpose:** Show a scored run (illustrative).
- **On-screen copy:** SCORE IT / Run it. Count passes. / $ score eval-set.csv · rows ......... 20 · pass ......... 14 · fail ......... 6 · (illustrative output)
- **Voiceover (if enabled):** Score it: twenty rows, fourteen pass, six fail. Illustrative output — the six failures are your to-do list.
- **Visual composition:** Terminal window 'eval-run' with deterministic typing.
- **Animation:** Lines type in at their cue frames.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 12.67s, tick @ 14.17s, tick @ 15.00s, tick @ 15.83s, tick @ 16.67s

### 4. takeaway — 0:19.7 → 0:24.7 (5.0s, frames 592–741)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** 20 real rows beat a perfect demo. / Save this and build yours today
- **Voiceover (if enabled):** Twenty real rows beat a perfect demo. Save this and build yours today.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 19.73s, chime @ 22.13s

## Voiceover edit plan

Full narration is 68 words ≈ 26.2s at a conversational 2.6 words/sec, versus 24.73s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 3.8 | no — extend by ~1.3s |
| columns | 9.7 | 10.4 | no — extend by ~1.2s |
| run | 7.1 | 6.9 | no — extend by ~0.4s |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **practitioner-opinion** — A small, real-input eval set with expected behaviour and a pass rule is a practical first evaluation.
- **illustrative** — Example run: 20 rows, 14 pass, 6 fail.
