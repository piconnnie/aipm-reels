# Storyboard — aipm-035-three-layers-of-evals

**Topic:** Three layers of LLM evaluation every team needs  
**Pillar:** B: GenAI Product Delivery · **Format:** framework · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers setting up LLM evaluation  
**Duration:** 25.33s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Use three evaluation layers (code checks for exact rules, rubric grading for judgement calls, human review of real samples) because each catches failures the others miss.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Which eval would catch a rude answer? | Question that exposes a gap | 4 | 5 | 5 | 4 | 5 | **23** |
| 2 | Code checks won’t catch a wrong policy. | Specific limitation | 5 | 4 | 4 | 5 | 4 | **22** |
| 3 | One eval layer isn’t enough. | Direct claim | 3 | 4 | 3 | 4 | 5 | **19** |

**Selected:** "Which eval would catch a rude answer?" — Highest total (23/25): a concrete failure the viewer can picture, and the reel answers it with three named layers.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Which eval catches a rude answer? / You need three layers to know.
- **Voiceover (if enabled):** Which eval catches a rude answer?
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. layers — 0:03.0 → 0:10.7 (7.7s, frames 90–319)

- **Purpose:** Name the three layers.
- **On-screen copy:** THE THREE LAYERS / Check, grade, then review. / Code checks: format, length, banned words, links · Rubric grading: correct, grounded, on tone? · Human review: a weekly sample of real chats / Run layer 1 on every change, 2 before release, 3 every week.
- **Voiceover (if enabled):** Three layers. Code checks for format, length, banned words and links. Rubric grading: is it correct, grounded and on tone? Human review of a weekly sample of real chats. Run layer one on every change, two before release, three every week.
- **Visual composition:** 3 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 156.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.30s, tick @ 6.70s, chime @ 8.27s

### 3. catches — 0:10.7 → 0:20.3 (9.7s, frames 320–609)

- **Purpose:** Show which failure each layer catches.
- **On-screen copy:** WHAT EACH CATCHES / One bug list, three filters. / FAILURE → CAUGHT BY → WHY THERE / Broken JSON output → Layer 1: code → Rule is exact · Cites the wrong policy → Layer 2: rubric → Needs judgement · Correct but rude → Layer 3: humans → People notice it / Each layer costs more than the last · Turn repeat human finds into checks
- **Voiceover (if enabled):** Broken JSON? Layer one: the rule is exact. Wrong policy? Layer two: it needs judgement. Correct but rude? Layer three: people notice. Each layer costs more, so turn repeat human findings into checks.
- **Visual composition:** Legend FAILURE → CAUGHT BY → WHY THERE; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 45 frames from 30; notes from 180.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.67s, tick @ 11.73s, tick @ 13.23s, tick @ 14.73s, tick @ 16.73s, tick @ 17.73s

### 4. takeaway — 0:20.3 → 0:25.3 (5.0s, frames 610–759)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Check cheap, grade smart, review real. / Save this for your eval plan
- **Voiceover (if enabled):** Check cheap, grade smart, review real. Save this for your eval plan.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.33s, chime @ 22.73s

## Voiceover edit plan

Full narration is 92 words ≈ 35.4s at a conversational 2.6 words/sec, versus 25.33s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 2.3 | yes |
| layers | 7.7 | 15.8 | no — extend by ~8.6s |
| catches | 9.7 | 12.7 | no — extend by ~3.5s |
| takeaway | 5.0 | 4.6 | yes |

## Claims register

- **practitioner-opinion** — Effective LLM evaluation combines deterministic checks, rubric-based grading and human review of real samples, because each catches different failures.
