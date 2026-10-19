# Storyboard — aipm-003-do-you-need-an-agent

**Topic:** Agent vs workflow: the question that decides it  
**Pillar:** C: Agentic AI · **Format:** a-vs-b · **Objective:** shares · **Depth:** intermediate  
**Audience:** PMs and engineers deciding how to build an LLM feature; product leaders reviewing 'agentic' proposals  
**Duration:** 27s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** If you can draw the steps in advance, build a workflow and add AI only where judgment is needed; reserve agents for tasks whose steps can’t be known up front.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Your AI agent might just be a workflow in disguise. | Counterintuitive insight | 4 | 5 | 5 | 4 | 5 | **23** |
| 2 | Stop calling every LLM feature an agent. | Common misconception | 3 | 5 | 4 | 4 | 5 | **21** |
| 3 | One question decides: agent or workflow? | Immediately usable framework | 4 | 4 | 4 | 5 | 4 | **21** |

**Selected:** "Your AI agent might just be a workflow in disguise." — Highest total (23/25). It reframes a hyped label in plain words, sparks recognition in teams building ‘agents’, and the reel resolves it with a decision rule viewers can share with their team.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** Create recognition: many 'agents' are fixed sequences with an LLM inside.
- **On-screen copy:** Your AI agent might just be a workflow in disguise. / One question decides it.
- **Voiceover (if enabled):** Your AI agent might just be a workflow in disguise. One question decides it.
- **Visual composition:** Four-line headline; 'in disguise.' highlighted; sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. workflow — 0:03.0 → 0:07.0 (4.0s, frames 90–209)

- **Purpose:** Define a workflow by its properties so the contrast lands.
- **On-screen copy:** WORKFLOW / You draw the steps. / Fixed steps, written in code · Predictable cost and latency · Easy to test and audit
- **Voiceover (if enabled):** In a workflow, you draw the steps. They're fixed in code, cost and latency are predictable, and it's easy to test.
- **Visual composition:** Kicker + headline; three green cards tagged WORKFLOW.
- **Animation:** Cards pop every 14 frames from 10; ~2.4s hold.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s

### 3. agent — 0:07.0 → 0:13.0 (6.0s, frames 210–389)

- **Purpose:** Show what changes with an agent: flexibility bought with variability and harder evaluation.
- **On-screen copy:** AGENT / The model picks the steps. / Model chooses the next step · Cost varies per request · Needs trajectory evals
- **Voiceover (if enabled):** In an agent, the model picks the steps. That buys flexibility, but cost varies per request and you have to evaluate the whole path, not just the answer.
- **Visual composition:** Same stack (hard cut), new headline; each card flips to its agent counterpart with an amber or slate state.
- **Animation:** Flips at 24/54/84; ~2.7s hold after the last flip.
- **Transition in:** cut
- **Sound cues:** tick @ 8.03s, low @ 9.03s, tick @ 10.03s

### 4. decision-rule — 0:13.0 → 0:22.0 (9.0s, frames 390–659)

- **Purpose:** Give the shareable decision rule.
- **On-screen copy:** THE DECISION RULE / Use an agent only when… / steps unknowable · actions reversible or gated · flexibility worth variable cost · trajectory can be evaluated / Otherwise: build the workflow, add AI where judgment is needed.
- **Voiceover (if enabled):** Use an agent only when the steps can't be known in advance, wrong actions are reversible or gated, the flexibility is worth variable cost, and you can evaluate the whole trajectory. Otherwise, build the workflow and add AI at the steps that need judgment.
- **Visual composition:** Four numbered criteria; cyan rule box.
- **Animation:** Items every 40 frames from 24; rule at ~190; ~2.7s hold.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 13.00s, tick @ 13.90s, tick @ 15.23s, tick @ 16.57s, tick @ 17.90s, chime @ 19.40s

### 5. takeaway — 0:22.0 → 0:27.0 (5.0s, frames 660–809)

- **Purpose:** Memorable rule + share CTA.
- **On-screen copy:** Draw it first. If you can, skip the agent. / Share this with your AI product team
- **Voiceover (if enabled):** Draw it first. If you can, skip the agent. Share this with your AI product team.
- **Visual composition:** Three-line takeaway, last line highlighted; arrow CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 22.00s, chime @ 24.40s

## Voiceover edit plan

Full narration is 123 words ≈ 47.3s at a conversational 2.6 words/sec, versus 27s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 5.4 | no — extend by ~2.9s |
| workflow | 4.0 | 8.1 | no — extend by ~4.6s |
| agent | 6.0 | 10.8 | no — extend by ~5.3s |
| decision-rule | 9.0 | 16.9 | no — extend by ~8.4s |
| takeaway | 5.0 | 6.2 | no — extend by ~1.7s |

## Claims register

- **practitioner-opinion** — If the steps of a task can be specified in advance, a workflow with LLM steps is usually more predictable and easier to test than an agent.
