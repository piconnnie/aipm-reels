# Storyboard — aipm-025-users-wont-wait-for-the-best

**Topic:** Latency vs quality: when a faster, smaller model is the better product  
**Pillar:** B: GenAI Product Delivery · **Format:** a-vs-b · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs choosing models for user-facing AI features  
**Duration:** 23.17s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Speed is part of quality: route narrow, easy requests to a smaller, faster model when your eval shows no meaningful drop, and keep the large model as the fallback for hard cases.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Users won’t wait for the best answer. | User truth | 4 | 5 | 4 | 4 | 5 | **22** |
| 2 | The best model can make a worse product. | Counterintuitive insight | 3 | 5 | 5 | 4 | 4 | **21** |
| 3 | Stop sending every request to your biggest model. | Instruction | 4 | 4 | 4 | 4 | 5 | **21** |

**Selected:** "Users won’t wait for the best answer." — Highest total (22/25): starts from what users do, which the illustrative comparison and the routing checklist then resolve.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Users won’t wait for the best answer. / When a smaller model wins.
- **Voiceover (if enabled):** Users won’t wait for the best answer. Here’s when a smaller model wins.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. wait — 0:03.0 → 0:08.5 (5.5s, frames 90–254)

- **Purpose:** Show the waiting-time difference with a labelled illustration.
- **On-screen copy:** SAME FEATURE [ILLUSTRATIVE] / LARGE MODEL ON EVERY ASK 8 s / ROUTED: SMALL FOR EASY 2 s / Route easy asks to the small model.
- **Voiceover (if enabled):** Illustrative: eight seconds per answer with the large model on everything, two seconds when easy asks go to a small model. Route easy asks to the small model.
- **Visual composition:** ILLUSTRATIVE badge; warning bar vs success bar; conclusion.
- **Animation:** Left at 4, right at 30 with count-up; conclusion at 84.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.33s, chime @ 4.20s, impact @ 5.87s

### 3. when — 0:08.5 → 0:18.2 (9.7s, frames 255–544)

- **Purpose:** When the smaller model is the better product.
- **On-screen copy:** WHEN SMALL WINS / Pick the faster model when… / The task is narrow: classify, extract, rewrite · Your eval shows no meaningful quality drop · Users are waiting in the loop, not in a batch · A large model is the fallback for hard cases / Decide with your eval set, not with the leaderboard.
- **Voiceover (if enabled):** Pick the faster model when the task is narrow, your eval shows no real quality drop, users are waiting, and a large model catches the hard cases. Decide with your eval set, not the leaderboard.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 8.50s, tick @ 9.40s, tick @ 10.80s, tick @ 12.20s, tick @ 13.60s, chime @ 15.23s

### 4. takeaway — 0:18.2 → 0:23.2 (5.0s, frames 545–694)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Speed is part of quality. / Save this for your next model choice
- **Voiceover (if enabled):** Speed is part of quality. Save this for your next model choice.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 18.17s, chime @ 20.57s

## Voiceover edit plan

Full narration is 88 words ≈ 33.8s at a conversational 2.6 words/sec, versus 23.17s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 5.0 | no — extend by ~2.5s |
| wait | 5.5 | 10.8 | no — extend by ~5.8s |
| when | 9.7 | 13.5 | no — extend by ~4.3s |
| takeaway | 5.0 | 4.6 | yes |

## Claims register

- **practitioner-opinion** — For narrow, user-facing tasks, a smaller and faster model with a large-model fallback is often the better product, if evaluation shows no meaningful quality loss.
- **illustrative** — 8 seconds per answer with a large model on every request vs 2 seconds with easy requests routed to a small model.
