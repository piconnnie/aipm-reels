# Storyboard — aipm-008-who-runs-the-tools

**Topic:** How tool calling actually works, in 30 seconds  
**Pillar:** C: Agentic AI · **Format:** architecture · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and leaders reviewing agent designs  
**Duration:** 25.27s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** In tool calling the model only proposes a call; your code decides whether and how to run it, so permissions, approvals and logging belong in your code, not the prompt.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | The model doesn’t run your tools. Your code does. | Counterintuitive insight | 5 | 5 | 4 | 5 | 5 | **24** |
| 2 | Tool calling in 30 seconds. | Immediately usable framework | 3 | 4 | 3 | 5 | 5 | **20** |
| 3 | Who’s really in control of your AI agent? | Question | 3 | 5 | 5 | 4 | 3 | **20** |

**Selected:** "The model doesn’t run your tools. Your code does." — Highest total (24/25): the reframe is accurate and has a direct product consequence — where you put permissions and approvals.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** The model doesn’t run your tools. / Your code does.
- **Voiceover (if enabled):** The model doesn't run your tools. Your code does.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. flow — 0:03.0 → 0:10.7 (7.7s, frames 90–319)

- **Purpose:** Show the control flow and where control sits.
- **On-screen copy:** TOOL CALLING IN 30S / Who does what? / User request → Model proposes → Your code runs it → Result to model → Final answer / Permissions live in your code, not the prompt.
- **Voiceover (if enabled):** The user asks. The model proposes a tool and arguments. Your code decides whether to run it. The result goes back to the model, which writes the answer. Permissions live in your code, not in the prompt.
- **Visual composition:** Vertical pipeline of 5 nodes with flow pulse; amber callout on node 3.
- **Animation:** Nodes every 18 frames from 20; callout at 140.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.77s, tick @ 4.37s, tick @ 4.97s, tick @ 5.57s, tick @ 6.17s, low @ 7.73s

### 3. questions — 0:10.7 → 0:20.3 (9.6s, frames 320–607)

- **Purpose:** Turn the architecture into review questions.
- **On-screen copy:** PM QUESTIONS / Ask before you ship. / Which tools can it call, and with what scope? · Which actions need human approval? · What happens when a call fails? · Is every tool call logged for audit? / If you can’t answer one, it’s not ready.
- **Voiceover (if enabled):** Before you ship, ask: which tools, with what scope? Which actions need approval? What happens when a call fails? Is every call logged?
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 198.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 10.67s, tick @ 11.57s, tick @ 12.97s, tick @ 14.37s, tick @ 15.77s, chime @ 17.33s

### 4. takeaway — 0:20.3 → 0:25.3 (5.0s, frames 608–757)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** The model suggests. Your code acts. / Save this for your next agent review
- **Voiceover (if enabled):** The model suggests. Your code acts. Save this for your next agent review.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.27s, chime @ 22.67s

## Voiceover edit plan

Full narration is 82 words ≈ 31.5s at a conversational 2.6 words/sec, versus 25.27s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 3.5 | no — extend by ~1.0s |
| flow | 7.7 | 14.2 | no — extend by ~7.1s |
| questions | 9.6 | 8.8 | yes |
| takeaway | 5.0 | 5.0 | no — extend by ~0.5s |

## Claims register

- **practitioner-opinion** — In tool-calling systems the model proposes calls and application code executes them, so access control belongs in application code rather than prompts.
