# Storyboard — aipm-020-more-agents-isnt-smarter

**Topic:** Myth: more agents means a smarter system  
**Pillar:** C: Agentic AI · **Format:** myth-vs-reality · **Objective:** shares · **Depth:** intermediate  
**Audience:** PMs and engineers designing agentic systems  
**Duration:** 25s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Each extra agent adds hand-offs, coordination failures, cost and debugging pain, so start with one agent and split only when an eval shows the split does better.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | More agents, more ways to fail. | Counterintuitive insight | 4 | 5 | 5 | 4 | 5 | **23** |
| 2 | Your multi-agent system might be one agent too many. | Warning | 3 | 5 | 4 | 4 | 4 | **20** |
| 3 | Why we merged four agents into one. | Story | 4 | 4 | 5 | 2 | 4 | **19** |

**Selected:** "More agents, more ways to fail." — Highest total (23/25): short, contradicts the myth directly, and the reel shows each failure mode then a test for adding an agent.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** More agents, more ways to fail. / Earn every agent you add.
- **Voiceover (if enabled):** More agents, more ways to fail. Earn every agent you add.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. myth — 0:03.0 → 0:10.3 (7.3s, frames 90–309)

- **Purpose:** Show each promised benefit, then flip it to what it actually adds.
- **On-screen copy:** MORE AGENTS / The promise vs what you get. / MYTH A specialist for every step → REALITY Context lost at each hand-off · MYTH Agents check each other → REALITY Agents loop or agree on errors · MYTH Parallel means faster → REALITY More calls, cost and latency
- **Voiceover (if enabled):** The promise: a specialist for every step, agents that check each other, parallel speed. What you get: context lost at hand-offs, agents that loop or agree on the same error, and more calls, cost and latency.
- **Visual composition:** Kicker + headline; 3 tagged cards that flip to their real-world counterpart.
- **Animation:** Cards pop every 14 frames from 10; flips every 32 frames from 76.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.53s, tick @ 4.00s, tick @ 4.47s, low @ 5.77s, low @ 6.83s, low @ 7.90s

### 3. earn — 0:10.3 → 0:20.0 (9.7s, frames 310–599)

- **Purpose:** Give the test for adding an agent.
- **On-screen copy:** EARN EACH AGENT / Add an agent only if… / One agent fails a task you can name · The sub-task needs different tools or permissions · The hand-off has a clear, testable contract · Your eval shows the split beats one agent / Start with one agent and a good workflow. Split when evals say so.
- **Voiceover (if enabled):** Add an agent only if one agent fails a task you can name, the sub-task needs different tools or permissions, the hand-off has a testable contract, and your eval shows the split wins.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.33s, tick @ 11.23s, tick @ 12.63s, tick @ 14.03s, tick @ 15.43s, chime @ 17.07s

### 4. takeaway — 0:20.0 → 0:25.0 (5.0s, frames 600–749)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Earn every agent you add. / Share this with your agent team
- **Voiceover (if enabled):** Earn every agent you add. Share this with your agent team.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.00s, chime @ 22.40s

## Voiceover edit plan

Full narration is 91 words ≈ 35.0s at a conversational 2.6 words/sec, versus 25s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.2 | no — extend by ~1.7s |
| myth | 7.3 | 13.8 | no — extend by ~7.0s |
| earn | 9.7 | 12.7 | no — extend by ~3.5s |
| takeaway | 5.0 | 4.2 | yes |

## Claims register

- **practitioner-opinion** — Adding agents adds hand-off, coordination, cost and debugging overhead; a single agent should be the default until evaluation shows a split performs better.
