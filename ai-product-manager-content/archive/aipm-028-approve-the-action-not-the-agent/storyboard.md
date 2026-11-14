# Storyboard — aipm-028-approve-the-action-not-the-agent

**Topic:** Where to put human approval gates in an agent  
**Pillar:** C: Agentic AI · **Format:** framework · **Objective:** saves · **Depth:** intermediate  
**Audience:** PMs and engineers designing agent workflows  
**Duration:** 24.8s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Put approval gates on actions, not on the whole agent: the harder an action is to undo, the earlier a human approves it.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Don’t approve the agent. Approve the action. | Reframe | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Your agent needs four gate levels, not one. | Number promise | 4 | 5 | 3 | 4 | 4 | **20** |
| 3 | Approving every agent step defeats the point. | Contrarian | 3 | 4 | 4 | 4 | 4 | **19** |

**Selected:** "Don’t approve the agent. Approve the action." — Highest total (23/25): a crisp reframe that the gate map makes concrete and the refund example proves.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Don’t approve the agent. Approve the action. / Where the gates go, by risk.
- **Voiceover (if enabled):** Don’t approve the agent. Approve the action. Here’s where the gates go.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. map — 0:03.0 → 0:13.0 (10.0s, frames 90–389)

- **Purpose:** The framework: gate level by how hard the action is to undo.
- **On-screen copy:** THE GATE MAP / Gate by action, not by agent. / Read-only lookups: no gate, just log them · Drafts and internal notes: spot-check later · Messages to customers: approve before sending · Money, deletes, permissions: always approve / The harder an action is to undo, the earlier a human steps in.
- **Voiceover (if enabled):** Read-only lookups: no gate, just log them. Drafts and internal notes: spot-check later. Messages to customers: approve before sending. Money, deletes and permissions: always approve. The harder an action is to undo, the earlier a human steps in.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 200.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.30s, tick @ 6.70s, tick @ 8.10s, chime @ 9.73s

### 3. example — 0:13.0 → 0:19.8 (6.8s, frames 390–593)

- **Purpose:** Worked example: one agent, four gate levels.
- **On-screen copy:** EXAMPLE: REFUND AGENT / One agent, four gate levels. / NO GATE Look up the order · SPOT-CHECK Draft the reply · APPROVE FIRST Send it to the customer · ALWAYS APPROVE Issue the refund
- **Voiceover (if enabled):** In a refund agent: looking up the order needs no gate. Drafting the reply gets spot-checked. Sending it needs approval first. Issuing the refund is always approved.
- **Visual composition:** Kicker + headline; 4 tagged cards.
- **Animation:** Cards pop every 26 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 13.00s, tick @ 13.53s, tick @ 14.40s, tick @ 15.27s, tick @ 16.13s

### 4. takeaway — 0:19.8 → 0:24.8 (5.0s, frames 594–743)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Gate what you can’t undo. / Save this for your agent design review
- **Voiceover (if enabled):** Gate what you can’t undo. Save this for your agent design review.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 19.80s, chime @ 22.20s

## Voiceover edit plan

Full narration is 89 words ≈ 34.2s at a conversational 2.6 words/sec, versus 24.8s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.6 | no — extend by ~2.1s |
| map | 10.0 | 14.6 | no — extend by ~5.1s |
| example | 6.8 | 10.4 | no — extend by ~4.1s |
| takeaway | 5.0 | 4.6 | yes |

## Claims register

- **practitioner-opinion** — Approval gates in an agent work best per action, set by how reversible and high-impact the action is.
