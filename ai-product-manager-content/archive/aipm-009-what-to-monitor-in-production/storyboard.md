# Storyboard — aipm-009-what-to-monitor-in-production

**Topic:** What to monitor once your LLM feature is live  
**Pillar:** B: GenAI Product Delivery · **Format:** decision-checklist · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineering leads launching GenAI features  
**Duration:** 23.27s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** LLM features fail quietly after launch, so set thresholds before launch for input drift, refusal rate, cost per task, user corrections and eval pass rate.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Launch day is when evaluation starts. | Counterintuitive insight | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Your AI feature is failing quietly. Here’s how to tell. | Specific professional mistake | 4 | 5 | 5 | 3 | 4 | **21** |
| 3 | Five numbers to watch after an AI launch. | Immediately usable framework | 4 | 4 | 3 | 5 | 5 | **21** |

**Selected:** "Launch day is when evaluation starts." — Highest total (23/25): reframes launch as the start of measurement and delivers five concrete signals.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Launch day is when evaluation starts. / 5 signals to watch.
- **Voiceover (if enabled):** Launch day is when evaluation starts.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. signals — 0:03.0 → 0:13.3 (10.3s, frames 90–399)

- **Purpose:** Give the five signals.
- **On-screen copy:** MONITOR THESE / After launch, watch for… / Input drift: users ask new kinds of things · Refusal and “not sure” rate · Cost per completed task · User corrections and retries · Eval pass rate on every change / Set an alert threshold for each before launch.
- **Voiceover (if enabled):** Watch input drift, the refusal rate, cost per completed task, user corrections and retries, and the eval pass rate on every change. Set thresholds before launch.
- **Visual composition:** 5 numbered items; cyan rule box.
- **Animation:** Items every 38 frames from 24; rule at 220.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.17s, tick @ 6.43s, tick @ 7.70s, tick @ 8.97s, chime @ 10.40s

### 3. why — 0:13.3 → 0:18.3 (4.9s, frames 400–547)

- **Purpose:** Show what quiet failure looks like.
- **On-screen copy:** WHY IT MATTERS / Silent failures look like success. / EXAMPLE Retries spike after an update · EXAMPLE Cost per task creeps up · EXAMPLE New question types appear
- **Voiceover (if enabled):** Silent failures look like success: retries spike after an update, cost creeps up, new kinds of questions appear.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 24 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 13.33s, low @ 13.87s, low @ 14.67s, tick @ 15.47s

### 4. takeaway — 0:18.3 → 0:23.3 (5.0s, frames 548–697)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Shipped isn’t finished. / Save this for your launch checklist
- **Voiceover (if enabled):** Shipped isn't finished. Save this for your launch checklist.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 18.27s, chime @ 20.67s

## Voiceover edit plan

Full narration is 59 words ≈ 22.7s at a conversational 2.6 words/sec, versus 23.27s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 2.3 | yes |
| signals | 10.3 | 10.0 | yes |
| why | 4.9 | 6.9 | no — extend by ~2.5s |
| takeaway | 5.0 | 3.5 | yes |

## Claims register

- **practitioner-opinion** — Production LLM features should be monitored for input drift, refusal rate, cost per task, user corrections and eval regressions.
