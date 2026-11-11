# Storyboard — aipm-024-right-answer-wrong-path

**Topic:** Measuring an agent only by whether the final answer was right  
**Pillar:** C: Agentic AI · **Format:** mistake · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers evaluating AI agents  
**Duration:** 25s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** A correct final answer can hide wrong tool calls, wasted steps and risky actions, so evaluate an agent’s trajectory — tools, steps and unapproved actions — not just its output.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Right answer. Wrong path. | Contrast | 4 | 5 | 5 | 5 | 5 | **24** |
| 2 | Your agent passed the eval and still emailed a customer. | Scenario | 5 | 4 | 5 | 3 | 4 | **21** |
| 3 | Grading agents on the final answer is half an eval. | Direct claim | 3 | 5 | 3 | 4 | 4 | **19** |

**Selected:** "Right answer. Wrong path." — Highest total (24/25): a crisp contrast that the card flips prove and the table turns into checks.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Right answer. Wrong path. / Grade how your agent got there.
- **Voiceover (if enabled):** Right answer. Wrong path. Grade how your agent got there.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. runs — 0:03.0 → 0:10.3 (7.3s, frames 90–309)

- **Purpose:** Show three runs that pass on the answer, then reveal their paths.
- **On-screen copy:** THREE RUNS (ILLUSTRATIVE) / All three got the answer right. / FINAL ANSWER Run 1: correct answer → PATH OK Called the right tools · FINAL ANSWER Run 2: correct answer → PATH WASTEFUL Took 14 steps for a 3-step job · FINAL ANSWER Run 3: correct answer → PATH RISKY Emailed a customer by mistake
- **Voiceover (if enabled):** Three illustrative runs, all with the right answer. Run one used the right tools. Run two took fourteen steps for a three-step job. Run three emailed a customer by mistake.
- **Visual composition:** Kicker + headline; 3 tagged cards that flip to their real-world counterpart.
- **Animation:** Cards pop every 14 frames from 10; flips every 32 frames from 76.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s, tick @ 5.77s, low @ 6.83s, low @ 7.90s

### 3. checks — 0:10.3 → 0:20.0 (9.7s, frames 310–599)

- **Purpose:** The better approach: grade the trajectory.
- **On-screen copy:** GRADE THE TRAJECTORY / Check the path, not just the end. / CHECK → LOOK FOR → FAIL IF / Tool choice → Right tool, right args → Wrong or made-up tool · Steps taken → Close to expected → Loops or detours · Risky actions → Approved first → Any unapproved write / Log every step, not just the output · Review failed paths, even on passes
- **Voiceover (if enabled):** Grade the trajectory: the right tool with the right arguments, a step count close to expected, and no risky action without approval. Log every step, and review bad paths even when the answer passed.
- **Visual composition:** Legend CHECK → LOOK FOR → FAIL IF; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 45 frames from 30; notes from 180.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.33s, tick @ 11.40s, tick @ 12.90s, tick @ 14.40s, tick @ 16.40s, tick @ 17.40s

### 4. takeaway — 0:20.0 → 0:25.0 (5.0s, frames 600–749)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Grade the path, not just the end. / Save this for your agent eval plan
- **Voiceover (if enabled):** Grade the path, not just the end. Save this for your agent eval plan.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.00s, chime @ 22.40s

## Voiceover edit plan

Full narration is 88 words ≈ 33.8s at a conversational 2.6 words/sec, versus 25s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 3.8 | no — extend by ~1.3s |
| runs | 7.3 | 11.5 | no — extend by ~4.7s |
| checks | 9.7 | 13.1 | no — extend by ~3.9s |
| takeaway | 5.0 | 5.4 | no — extend by ~0.9s |

## Claims register

- **practitioner-opinion** — Evaluating agents only on the final answer misses wrong tool use, wasted steps and unapproved actions; trajectories should be evaluated as well.
- **illustrative** — Three example runs, including one taking 14 steps for a 3-step job.
