# Storyboard — aipm-027-your-ai-prd-is-missing-four

**Topic:** Writing a PRD for an AI feature exactly like a normal PRD  
**Pillar:** A: AI Product Management · **Format:** mistake · **Objective:** saves · **Depth:** beginner  
**Audience:** PMs writing specs for AI features  
**Duration:** 26.47s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** A standard PRD template assumes the software does what it is told; an AI PRD needs four extra sections — failure modes, eval plan, data dependencies and a cost envelope — before anyone builds.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Your PRD template assumes the code is right. | Hidden assumption | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Four sections every AI PRD is missing. | List promise | 4 | 5 | 3 | 4 | 5 | **21** |
| 3 | Copy-pasting your PRD template into an AI project? | Question | 3 | 5 | 3 | 4 | 4 | **19** |

**Selected:** "Your PRD template assumes the code is right." — Highest total (23/25): it points at an assumption every PM has never questioned, and the flip cards show exactly where the template falls short.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Your PRD template assumes the code is right. / Add these four sections.
- **Voiceover (if enabled):** Your PRD template assumes the code is right. AI features need four more sections.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. template — 0:03.0 → 0:11.5 (8.5s, frames 90–343)

- **Purpose:** Show the normal sections, then flip each to what an AI feature also needs.
- **On-screen copy:** THE USUAL TEMPLATE / The usual sections, minus the AI parts. / NORMAL PRD Requirements → MISSING Plus: how it can be wrong · NORMAL PRD Acceptance criteria → MISSING Plus: the eval plan · NORMAL PRD Dependencies: APIs → MISSING Plus: the data it reads · NORMAL PRD Cost: infra estimate → MISSING Plus: cost per task
- **Voiceover (if enabled):** The usual template has requirements, acceptance criteria, dependencies and cost. For AI you also need how it can be wrong, an eval plan, the data it reads, and cost per task.
- **Visual composition:** Kicker + headline; 4 tagged cards that flip to their real-world counterpart.
- **Animation:** Cards pop every 14 frames from 10; flips every 32 frames from 76.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s, tick @ 4.93s, low @ 5.77s, low @ 6.83s, low @ 7.90s, low @ 8.97s

### 3. sections — 0:11.5 → 0:21.5 (10.0s, frames 344–643)

- **Purpose:** The better approach: the four AI sections, concretely.
- **On-screen copy:** ADD THESE FOUR / Write them before the build. / Failure modes: what wrong looks like + fallback · Eval plan: test set, metric, pass bar · Data: what it reads, who owns it, how fresh · Cost envelope: max cost and latency per task / If a section is still blank, the feature isn’t ready to build.
- **Voiceover (if enabled):** Add four sections. Failure modes and the fallback. An eval plan with a test set and a pass bar. The data it reads, who owns it and how fresh it is. And a maximum cost and latency per task. If a section is blank, it isn’t ready to build.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.47s, tick @ 12.37s, tick @ 13.77s, tick @ 15.17s, tick @ 16.57s, chime @ 18.20s

### 4. takeaway — 0:21.5 → 0:26.5 (5.0s, frames 644–793)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** A PRD for AI says how it can be wrong. / Save this before your next AI PRD
- **Voiceover (if enabled):** A PRD for AI says how it can be wrong. Save this before your next AI PRD.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 21.47s, chime @ 23.87s

## Voiceover edit plan

Full narration is 111 words ≈ 42.7s at a conversational 2.6 words/sec, versus 26.47s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 5.4 | no — extend by ~2.9s |
| template | 8.5 | 11.9 | no — extend by ~4.0s |
| sections | 10.0 | 18.8 | no — extend by ~9.3s |
| takeaway | 5.0 | 6.5 | no — extend by ~2.0s |

## Claims register

- **practitioner-opinion** — PRDs for AI features should add failure modes, an eval plan, data dependencies and a cost envelope to the standard template.
