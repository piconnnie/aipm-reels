# Storyboard — aipm-023-notes-into-a-decision-log

**Topic:** A prompt that turns meeting notes into a decision log  
**Pillar:** F: AI Tools and Experiments · **Format:** build-with-me · **Objective:** saves · **Depth:** beginner  
**Audience:** PMs and team leads who run lots of meetings  
**Duration:** 25.33s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Ask the model for decisions only — each with an owner, due date and open question, marking missing owners as UNASSIGNED and forbidding invention — and the gaps become the useful output.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Turn meeting notes into a decision log. | Utility | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Your meeting notes are missing the only part that matters. | Curiosity gap | 3 | 4 | 5 | 4 | 3 | **19** |
| 3 | One prompt that finds decisions nobody owns. | Benefit | 4 | 4 | 5 | 4 | 4 | **21** |

**Selected:** "Turn meeting notes into a decision log." — Highest total (23/25): a practical promise the viewer can use today; the UNASSIGNED angle becomes the payoff.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Turn notes into a decision log. / One prompt. Copy it.
- **Voiceover (if enabled):** Turn meeting notes into a decision log. One prompt. Copy it.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. prompt — 0:03.0 → 0:11.7 (8.7s, frames 90–349)

- **Purpose:** Show the full prompt.
- **On-screen copy:** THE PROMPT / Paste notes, then this. / From these notes, list only · decisions actually made. · For each: decision, owner, · due date, open question. · If no owner: UNASSIGNED. · Don’t invent anything.
- **Voiceover (if enabled):** Paste your notes, then: from these notes, list only decisions actually made. For each, the decision, owner, due date and open question. If there’s no owner, write UNASSIGNED. Don’t invent anything.
- **Visual composition:** Terminal window 'prompt.txt' with deterministic typing.
- **Animation:** Lines type in at their cue frames.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 4.33s, tick @ 5.33s, tick @ 6.33s, tick @ 7.33s, tick @ 8.33s

### 3. output — 0:11.7 → 0:20.3 (8.7s, frames 350–609)

- **Purpose:** Show what the output looks like (fictional example).
- **On-screen copy:** EXAMPLE OUTPUT / One row per decision. / DECISION → OWNER → OPEN QUESTION / Pause the pricing test → Owner: Priya → Restart date? · Ship search beta to 10% → Owner: UNASSIGNED → Who signs off? · Drop the PDF export → Owner: Sam → Tell support? / UNASSIGNED is the useful part · Paste the log back into the doc
- **Voiceover (if enabled):** One row per decision, with an owner and an open question. The UNASSIGNED rows are the useful part. Paste the log back into the meeting doc.
- **Visual composition:** Legend DECISION → OWNER → OPEN QUESTION; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 40 frames from 30; notes from 170.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.67s, tick @ 12.73s, tick @ 14.07s, tick @ 15.40s, tick @ 17.40s, tick @ 18.40s

### 4. takeaway — 0:20.3 → 0:25.3 (5.0s, frames 610–759)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Decisions need owners. / Save this prompt for Monday
- **Voiceover (if enabled):** Decisions need owners. Save this prompt for Monday.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.33s, chime @ 22.73s

## Voiceover edit plan

Full narration is 76 words ≈ 29.2s at a conversational 2.6 words/sec, versus 25.33s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.2 | no — extend by ~1.7s |
| prompt | 8.7 | 11.9 | no — extend by ~3.8s |
| output | 8.7 | 10.0 | no — extend by ~1.8s |
| takeaway | 5.0 | 3.1 | yes |

## Claims register

- **practitioner-opinion** — Constraining a model to list only decisions, with explicit placeholders for missing owners and an instruction not to invent, produces a more useful and safer meeting summary than a general summary request.
