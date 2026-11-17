# Storyboard — aipm-030-bigger-model-same-made-up-answers

**Topic:** Myth: a bigger model will fix our hallucinations  
**Pillar:** B: GenAI Product Delivery · **Format:** myth-vs-reality · **Objective:** shares · **Depth:** intermediate  
**Audience:** PMs and engineers shipping RAG and chat features  
**Duration:** 27.47s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Many product hallucinations come from missing or stale sources, prompts that never allow “I don’t know”, or missing tools — a bigger model can’t supply facts it never saw, so check inputs first.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | A bigger model won’t fix missing facts. | Direct rebuttal | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Upgrading the model didn’t stop the made-up answers. | Scenario | 4 | 5 | 4 | 4 | 4 | **21** |
| 3 | Hallucinations are usually an input problem. | Claim | 3 | 5 | 3 | 4 | 4 | **19** |

**Selected:** "A bigger model won’t fix missing facts." — Highest total (23/25): a short rebuttal that is readable at once, with cards that flip each symptom to its real cause.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** A bigger model won’t fix missing facts. / Find the real cause first.
- **Voiceover (if enabled):** A bigger model won’t fix missing facts. Find the real cause first.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. causes — 0:03.0 → 0:11.5 (8.5s, frames 90–343)

- **Purpose:** Show symptoms blamed on the model, then flip each to the usual real cause.
- **On-screen copy:** EXAMPLES (ILLUSTRATIVE) / Blamed on the model. Caused upstream. / BLAMED: MODEL Quotes last year’s price → STALE DATA Index never refreshed · BLAMED: MODEL Invents a policy rule → RETRIEVAL Right doc never retrieved · BLAMED: MODEL Guesses an order status → MISSING TOOL No tool to check orders · BLAMED: MODEL Answers out of scope → PROMPT Prompt bans “I don’t know”
- **Voiceover (if enabled):** Quoting last year’s price: the index was never refreshed. Inventing a policy: the right document was never retrieved. Guessing an order status: there’s no tool to check. Answering out of scope: the prompt never allows “I don’t know.”
- **Visual composition:** Kicker + headline; 4 tagged cards that flip to their real-world counterpart.
- **Animation:** Cards pop every 14 frames from 10; flips every 32 frames from 76.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s, tick @ 4.93s, low @ 5.77s, low @ 6.83s, low @ 7.90s, low @ 8.97s

### 3. order — 0:11.5 → 0:22.5 (11.0s, frames 344–673)

- **Purpose:** Reasoning: check the cheap causes before changing the model.
- **On-screen copy:** CHECK IN THIS ORDER / Cheapest fix first. / Was the right source retrieved? · Is that source current and correct? · Does the prompt allow “I don’t know”? · Is there a tool for live data? · Only then: test a bigger model on your eval set / A bigger model can reason better. It can’t know what it never saw.
- **Voiceover (if enabled):** Check in this order: was the right source retrieved, is it current, does the prompt allow I don’t know, is there a tool for live data. Only then test a bigger model on your eval set.
- **Visual composition:** 5 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 242.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.47s, tick @ 12.37s, tick @ 13.77s, tick @ 15.17s, tick @ 16.57s, tick @ 17.97s, chime @ 19.60s

### 4. takeaway — 0:22.5 → 0:27.5 (5.0s, frames 674–823)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Fix the inputs before the model. / Share this with your AI team
- **Voiceover (if enabled):** Fix the inputs before the model. Share this with your AI team.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 22.47s, chime @ 24.87s

## Voiceover edit plan

Full narration is 98 words ≈ 37.7s at a conversational 2.6 words/sec, versus 27.47s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.6 | no — extend by ~2.1s |
| causes | 8.5 | 14.6 | no — extend by ~6.6s |
| order | 11.0 | 13.8 | no — extend by ~3.3s |
| takeaway | 5.0 | 4.6 | yes |

## Claims register

- **practitioner-opinion** — Many hallucinations in products come from retrieval gaps, stale data, missing tools or prompts that forbid uncertainty; a larger model cannot supply facts it never received.
- **illustrative** — Four example symptoms and their causes.
