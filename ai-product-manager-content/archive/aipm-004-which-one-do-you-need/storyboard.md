# Storyboard — aipm-004-which-one-do-you-need

**Topic:** RAG vs fine-tuning: which problem each actually solves  
**Pillar:** B: GenAI Product Delivery · **Format:** a-vs-b · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers choosing how to improve an LLM feature  
**Duration:** 23s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Choose by what the model is missing: retrieval fixes missing or changing facts, fine-tuning fixes behaviour like format and tone, and a better prompt is the cheapest first test for both.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | RAG or fine-tuning? Ask what’s missing. | Immediately usable framework | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Fine-tuning is the wrong fix for most knowledge gaps. | Common misconception | 4 | 5 | 5 | 3 | 4 | **21** |
| 3 | Your model doesn’t need training. It needs the right page. | Counterintuitive insight | 3 | 4 | 4 | 4 | 3 | **18** |

**Selected:** "RAG or fine-tuning? Ask what’s missing." — Highest total (23/25) and the most honest: it promises a decision rule rather than declaring a winner, and the reel delivers the rule plus a third, cheaper option.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** Frame a common debate as a single diagnostic question.
- **On-screen copy:** RAG or fine-tuning? Ask what’s missing. / Knowledge or behaviour?
- **Voiceover (if enabled):** RAG or fine-tuning? Start by asking what the model is missing.
- **Visual composition:** Four-line headline; last two lines highlighted; slate sub-line.
- **Animation:** Readable on frame 0; underline sweeps; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. the-question — 0:03.0 → 0:08.0 (5.0s, frames 90–239)

- **Purpose:** Split every gap into two kinds so the mapping in the next scene is obvious.
- **On-screen copy:** THE QUESTION / What is the model missing? / KNOWLEDGE: private or changing facts / BEHAVIOUR: a format, tone or skill
- **Voiceover (if enabled):** Either it's missing knowledge — private or changing facts — or it's missing behaviour: a format, a tone, a skill.
- **Visual composition:** Two tagged cards with question-mark icons.
- **Animation:** Cards pop at 10 and 50; ~2.8s hold.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.87s

### 3. the-mapping — 0:08.0 → 0:18.0 (10.0s, frames 240–539)

- **Purpose:** Map three concrete gaps to the right fix, including the cheapest one people skip.
- **On-screen copy:** MATCH THE FIX / GAP → FIX → WHY / This week’s docs → RAG / Wrong format or house tone → Fine-tuning / Ignores clear instructions → Fix the prompt first
- **Voiceover (if enabled):** If answers need this week's documents, that's retrieval — facts change. If the format or tone is wrong, that's behaviour — fine-tuning can help. And if it ignores clear instructions, fix the prompt first; it's the cheapest test.
- **Visual composition:** Legend GAP → FIX → WHY; three rows with the fix in cyan and the reason in green; two notes.
- **Animation:** Rows at 30/75/120; notes at 180/210; ~3s hold.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 8.00s, tick @ 9.07s, tick @ 10.57s, tick @ 12.07s, tick @ 14.07s

### 4. takeaway — 0:18.0 → 0:23.0 (5.0s, frames 540–689)

- **Purpose:** Compress the rule into one line worth saving.
- **On-screen copy:** Facts → RAG. Behaviour → fine-tuning. / Save this for your next build decision
- **Voiceover (if enabled):** Missing facts: retrieve them. Wrong behaviour: tune it. Save this for your next build decision.
- **Visual composition:** Three-line takeaway, last line highlighted; bookmark CTA; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 18.00s, chime @ 20.40s

## Voiceover edit plan

Full narration is 84 words ≈ 32.3s at a conversational 2.6 words/sec, versus 23s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.2 | no — extend by ~1.7s |
| the-question | 5.0 | 7.7 | no — extend by ~3.2s |
| the-mapping | 10.0 | 14.6 | no — extend by ~5.1s |
| takeaway | 5.0 | 5.8 | no — extend by ~1.3s |

## Claims register

- **practitioner-opinion** — Retrieval suits missing or frequently changing knowledge; fine-tuning suits behaviour such as format, tone or narrow skills; prompt changes are the cheapest first test.
