# Storyboard — aipm-037-watch-what-users-do

**Topic:** Teardown: what one AI chat session tells you without a rating  
**Pillar:** A: AI Product Management · **Format:** teardown · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs choosing feedback metrics for AI features  
**Duration:** 23.67s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Ratings are rare, but regenerations, heavy edits, copy-outs and abandonment show where AI answers worked or failed, so log them from day one.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Nobody clicks thumbs-down. Read what they do. | Behaviour over ratings | 4 | 5 | 4 | 5 | 4 | **22** |
| 2 | The user rewrote 70% of the answer. Rating: none. | Story fragment | 5 | 4 | 5 | 3 | 3 | **20** |
| 3 | Your feedback button is mostly silent. | Observation | 3 | 4 | 3 | 4 | 5 | **19** |

**Selected:** "Nobody clicks thumbs-down. Read what they do." — Highest total (22/25): relatable, credible, and the reel shows exactly which behaviours to log.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Nobody clicks thumbs-down. Read what they do. / Behaviour is your real rating.
- **Voiceover (if enabled):** Nobody clicks thumbs-down. Read what they do.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. session — 0:03.0 → 0:10.3 (7.3s, frames 90–309)

- **Purpose:** Tear down one session's signals (illustrative).
- **On-screen copy:** ONE SESSION, LOGGED / No rating. Lots of signal. / $ replay session · answer shown ....... 1.8s · regenerate ......... x2 · user edited ........ 70% · copied out ......... yes · thumbs ............. none · (illustrative output)
- **Voiceover (if enabled):** Illustrative session: answer shown, regenerated twice, seventy percent edited, then copied out. No rating at all, but lots of signal.
- **Visual composition:** Terminal window 'session-log' with deterministic typing.
- **Animation:** Lines type in at their cue frames.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 4.33s, tick @ 5.07s, tick @ 5.80s, tick @ 6.53s, tick @ 7.27s, tick @ 8.00s

### 3. signals — 0:10.3 → 0:18.7 (8.3s, frames 310–559)

- **Purpose:** The behaviours to log and what each means.
- **On-screen copy:** LOG FROM DAY ONE / Track what users do. / Regenerate: the first answer missed · Heavy edits: right idea, wrong words · Copy or send: the answer got used · Abandon mid-task: it failed or was too slow / Ratings tell you why. Behaviour tells you where to look.
- **Voiceover (if enabled):** Log from day one. Regenerate: the first answer missed. Heavy edits: right idea, wrong words. Copy or send: the answer got used. Abandon mid-task: it failed or was too slow. Ratings tell you why; behaviour tells you where to look.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 36 frames from 24; rule at 174.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.33s, tick @ 11.23s, tick @ 12.43s, tick @ 13.63s, tick @ 14.83s, chime @ 16.20s

### 4. takeaway — 0:18.7 → 0:23.7 (5.0s, frames 560–709)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Watch the edits, not the thumbs. / Save this for your next metrics review
- **Voiceover (if enabled):** Watch the edits, not the thumbs. Save this for your next metrics review.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 18.67s, chime @ 21.07s

## Voiceover edit plan

Full narration is 80 words ≈ 30.8s at a conversational 2.6 words/sec, versus 23.67s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 2.7 | yes |
| session | 7.3 | 7.7 | no — extend by ~0.9s |
| signals | 8.3 | 15.4 | no — extend by ~7.6s |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **practitioner-opinion** — Implicit behavioural signals (regenerations, edits, copy-outs, abandonment) are more plentiful than explicit ratings and help locate AI answer failures.
- **illustrative** — Session log: 2 regenerations, 70% edited, copied out, no rating.
