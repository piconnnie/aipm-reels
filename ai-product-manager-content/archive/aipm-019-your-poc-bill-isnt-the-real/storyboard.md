# Storyboard — aipm-019-your-poc-bill-isnt-the-real

**Topic:** The PoC was cheap. Production costs far more. Why?  
**Pillar:** B: GenAI Product Delivery · **Format:** poc-to-production · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and leads taking a GenAI PoC to production  
**Duration:** 26s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** PoC costs hide four multipliers — real volume, longer context, retries and tool calls, and eval runs — so model cost per completed task at full scale before you commit.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Your PoC bill isn’t your real bill. | Warning | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | The PoC was cheap. That’s the problem. | Counterintuitive insight | 3 | 5 | 5 | 4 | 4 | **21** |
| 3 | Four numbers your AI cost estimate is missing. | List promise | 4 | 4 | 4 | 4 | 4 | **20** |

**Selected:** "Your PoC bill isn’t your real bill." — Highest total (23/25): direct and credible; the diagram shows the four multipliers and the checklist turns them into an estimate.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Your PoC bill isn’t your real bill. / Four multipliers the demo hides.
- **Voiceover (if enabled):** Your PoC bill isn’t your real bill. Four multipliers the demo hides.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. multipliers — 0:03.0 → 0:11.3 (8.3s, frames 90–339)

- **Purpose:** Show what multiplies cost between PoC and production.
- **On-screen copy:** PRODUCTION COST MODEL / What multiplies in production. / PoC cost → × real volume → × longer context → × retries & tools → × eval runs / Each factor looks small. Multiplied, they reshape the business case.
- **Voiceover (if enabled):** Start from the PoC cost. Multiply by real volume, longer context, retries and tool calls, and eval runs on every change. Each looks small. Multiplied, they reshape the business case.
- **Visual composition:** Vertical pipeline of 5 nodes with flow pulse; amber callout on node 5.
- **Animation:** Nodes every 20 frames from 20; callout at 140.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.77s, tick @ 4.43s, tick @ 5.10s, tick @ 5.77s, tick @ 6.43s, low @ 7.73s

### 3. estimate — 0:11.3 → 0:21.0 (9.7s, frames 340–629)

- **Purpose:** Give the steps to model the cost envelope early.
- **On-screen copy:** BEFORE YOU SCALE / Model the cost envelope early. / Estimate daily requests at full rollout · Measure real prompt size, not the demo’s · Count model calls per task, including retries · Budget eval runs for every prompt or model change / Report cost per completed task, not cost per call.
- **Voiceover (if enabled):** Estimate requests at full rollout, measure real prompt size, count calls per task including retries, and budget eval runs. Report cost per completed task, not per call.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.33s, tick @ 12.23s, tick @ 13.63s, tick @ 15.03s, tick @ 16.43s, chime @ 18.07s

### 4. takeaway — 0:21.0 → 0:26.0 (5.0s, frames 630–779)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Price it at full scale. Before launch. / Save this before you scale a PoC
- **Voiceover (if enabled):** Price it at full scale, before launch. Save this before you scale a PoC.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 21.00s, chime @ 23.40s

## Voiceover edit plan

Full narration is 83 words ≈ 31.9s at a conversational 2.6 words/sec, versus 26s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.6 | no — extend by ~2.1s |
| multipliers | 8.3 | 11.5 | no — extend by ~3.7s |
| estimate | 9.7 | 10.4 | no — extend by ~1.2s |
| takeaway | 5.0 | 5.4 | no — extend by ~0.9s |

## Claims register

- **practitioner-opinion** — Production GenAI costs are driven by volume, context length, calls per task (retries, tools) and evaluation runs, which PoC costs rarely reflect.
