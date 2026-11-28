# Storyboard — aipm-038-say-it-in-numbers

**Topic:** AI PMs who can't explain a trade-off to engineers  
**Pillar:** E: AI Product Career · **Format:** mistake · **Objective:** shares · **Depth:** beginner  
**Audience:** Aspiring and new AI PMs  
**Duration:** 18s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Describe model and prompt trade-offs with eval results, cost and latency instead of adjectives, because engineers can check a number.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Engineers don’t trust adjectives. | Specific professional mistake | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Stop saying the new model ‘feels smarter’. | Call-out | 4 | 5 | 4 | 4 | 4 | **21** |
| 3 | How to win a model debate with engineers. | How-to | 3 | 4 | 4 | 3 | 5 | **19** |

**Selected:** "Engineers don’t trust adjectives." — Highest total (23/25): readable at a glance, and the reel flips each vague claim into a checkable one.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Engineers don’t trust adjectives. / Bring numbers they can check.
- **Voiceover (if enabled):** Engineers don't trust adjectives.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. vague — 0:03.0 → 0:06.7 (3.7s, frames 90–199)

- **Purpose:** Show how PMs describe trade-offs today.
- **On-screen copy:** WHAT PMS SAY / Adjectives, not evidence. / VAGUE “It feels smarter” · VAGUE “Quality is way better” · VAGUE “It’s worth the cost”
- **Voiceover (if enabled):** What PMs say: it feels smarter. Quality is way better. It’s worth the cost.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 14 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s

### 3. evidence — 0:06.7 → 0:13.0 (6.3s, frames 200–389)

- **Purpose:** Replace each adjective with a checkable number (illustrative).
- **On-screen copy:** WHAT TO SAY · ILLUSTRATIVE / Numbers they can check. / EVAL +6 passes on our 50-case set · EVAL Wins 31 of 50 blind pairs · PRICE 2x cost per task, +0.8s wait
- **Voiceover (if enabled):** What to say instead, illustrative numbers: six more passes on our fifty-case set. Wins thirty-one of fifty blind comparisons. And the price: twice the cost per task and almost a second more wait.
- **Visual composition:** Same card stack (hard cut), new headline; each card flips to its counterpart.
- **Animation:** Flips every 30 frames from 24; ~2.5s hold.
- **Transition in:** cut
- **Sound cues:** tick @ 7.70s, tick @ 8.70s, chime @ 9.70s

### 4. takeaway — 0:13.0 → 0:18.0 (5.0s, frames 390–539)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Name the gain and the price in numbers. / Share this with a PM pitching models
- **Voiceover (if enabled):** Name the gain and the price, in numbers. Share this with a PM pitching models.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 13.00s, chime @ 15.40s

## Voiceover edit plan

Full narration is 66 words ≈ 25.4s at a conversational 2.6 words/sec, versus 18s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 1.5 | yes |
| vague | 3.7 | 5.4 | no — extend by ~2.2s |
| evidence | 6.3 | 12.7 | no — extend by ~6.9s |
| takeaway | 5.0 | 5.8 | no — extend by ~1.3s |

## Claims register

- **practitioner-opinion** — PMs communicate AI trade-offs more effectively with eval results, cost and latency than with qualitative descriptions.
- **illustrative** — +6 passes on a 50-case set; 31 of 50 blind wins; 2x cost per task; +0.8s latency.
