# Storyboard — aipm-014-who-grades-the-grader

**Topic:** Using an LLM to grade an LLM without checking the grader  
**Pillar:** B: GenAI Product Delivery · **Format:** mistake · **Objective:** saves · **Depth:** advanced  
**Audience:** Teams building LLM evaluation pipelines  
**Duration:** 17.67s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Before trusting an LLM judge, score a sample both by humans and by the judge and ship it only if they agree on the cases that matter.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Your AI grader needs grading too. | Specific professional mistake | 4 | 5 | 5 | 5 | 4 | **23** |
| 2 | Who checks the AI that checks your AI? | Question | 3 | 5 | 5 | 4 | 3 | **20** |
| 3 | LLM-as-judge is only as good as its agreement with you. | Counterintuitive insight | 4 | 4 | 3 | 5 | 3 | **19** |

**Selected:** "Your AI grader needs grading too." — Highest total (23/25): names the blind spot and the reel shows exactly how to check it.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Your AI grader needs grading too. / One check you can’t skip.
- **Voiceover (if enabled):** Your AI grader needs grading too.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. check — 0:03.0 → 0:12.7 (9.7s, frames 90–379)

- **Purpose:** Show how to measure judge agreement.
- **On-screen copy:** ILLUSTRATIVE CHECK / Compare it with human scores. / ANSWER → HUMAN → JUDGE / Cites the wrong policy → Human: fail → Judge: fail ✓ · Correct but very short → Human: pass → Judge: fail ✗ · Confident, made-up detail → Human: fail → Judge: pass ✗ / Score 50+ samples both ways · Use the judge only if they agree
- **Voiceover (if enabled):** Take a sample of answers. Score them with humans and with the judge. Here the judge agrees once and disagrees twice — including passing a confident, made-up detail. Score fifty or more samples both ways, and use the judge only if they agree.
- **Visual composition:** Legend ANSWER → HUMAN → JUDGE; 3 rows as cards with chips; 2 notes.
- **Animation:** Rows every 45 frames from 30; notes from 180.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 4.07s, tick @ 5.57s, tick @ 7.07s, tick @ 9.07s, tick @ 10.07s

### 3. takeaway — 0:12.7 → 0:17.7 (5.0s, frames 380–529)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Grade the grader first. / Save this for your eval setup
- **Voiceover (if enabled):** Grade the grader first. Save this for your eval setup.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 12.67s, chime @ 15.07s

## Voiceover edit plan

Full narration is 59 words ≈ 22.7s at a conversational 2.6 words/sec, versus 17.67s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 2.3 | yes |
| check | 9.7 | 16.5 | no — extend by ~7.4s |
| takeaway | 5.0 | 3.8 | yes |

## Claims register

- **practitioner-opinion** — LLM-as-judge evaluators should be validated against human scores on a sample before being trusted.
- **illustrative** — Three example rows showing judge/human agreement and disagreement.
