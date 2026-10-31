# Storyboard — aipm-017-most-rag-bugs-arent-the-model

**Topic:** Why your RAG answers are wrong even when the model is good  
**Pillar:** B: GenAI Product Delivery · **Format:** architecture · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers shipping RAG features  
**Duration:** 26s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** When a RAG answer is wrong, the cause is usually upstream of the model: the right chunk never reached the prompt, so debug retrieval before you blame or swap the model.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Wrong RAG answer? Check what the model was given. | Debugging instruction | 5 | 5 | 4 | 5 | 5 | **24** |
| 2 | Swapping the model won’t fix your RAG bot. | Counterintuitive insight | 4 | 5 | 4 | 4 | 4 | **21** |
| 3 | Your RAG bot isn’t dumb. It’s blind. | Metaphor | 3 | 4 | 5 | 3 | 4 | **19** |

**Selected:** "Wrong RAG answer? Check what the model was given." — Highest total (24/25): it tells the viewer exactly where to look, and the diagram and checklist deliver that debugging order.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Wrong answer? Check what it was given. / RAG bugs often start upstream.
- **Voiceover (if enabled):** Wrong answer? Check what the model was given. RAG bugs often start upstream.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. flow — 0:03.0 → 0:11.3 (8.3s, frames 90–339)

- **Purpose:** Trace one wrong answer through the RAG pipeline and show where it usually breaks.
- **On-screen copy:** WHERE RAG BREAKS / Trace one wrong answer. / User question → Query rewrite → Retrieve top-k → Build prompt → Model answers / If the right chunk never arrives, no model can answer correctly.
- **Voiceover (if enabled):** Follow one wrong answer: the question, the rewritten query, the retrieved chunks, the prompt, the answer. If the right chunk never arrives, no model can answer correctly.
- **Visual composition:** Vertical pipeline of 5 nodes with flow pulse; amber callout on node 3.
- **Animation:** Nodes every 20 frames from 20; callout at 140.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.77s, tick @ 4.43s, tick @ 5.10s, tick @ 5.77s, tick @ 6.43s, low @ 7.73s

### 3. debug — 0:11.3 → 0:21.0 (9.7s, frames 340–629)

- **Purpose:** Give the order to debug in.
- **On-screen copy:** DEBUG IN THIS ORDER / Before blaming the model… / Was the answer in the knowledge base at all? · Did retrieval return the right chunk? · Was it ranked high enough to fit the prompt? · Did the model ignore context it was given? / Log retrieved chunks with every answer so you can tell which.
- **Voiceover (if enabled):** Check in order: was the answer in the knowledge base, did retrieval find it, was it ranked high enough to fit, and only then, did the model ignore it. Log retrieved chunks with every answer.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.33s, tick @ 12.23s, tick @ 13.63s, tick @ 15.03s, tick @ 16.43s, chime @ 18.07s

### 4. takeaway — 0:21.0 → 0:26.0 (5.0s, frames 630–779)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Debug the retrieval first. / Save this for the next wrong answer
- **Voiceover (if enabled):** Debug the retrieval first. Save this for the next wrong answer.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 21.00s, chime @ 23.40s

## Voiceover edit plan

Full narration is 86 words ≈ 33.1s at a conversational 2.6 words/sec, versus 26s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 5.0 | no — extend by ~2.5s |
| flow | 8.3 | 10.4 | no — extend by ~2.6s |
| debug | 9.7 | 13.5 | no — extend by ~4.3s |
| takeaway | 5.0 | 4.2 | yes |

## Claims register

- **practitioner-opinion** — Many wrong RAG answers are caused by retrieval (the relevant chunk not reaching the prompt) rather than by the model, so retrieval should be debugged first.
