# Storyboard — aipm-031-ready-to-launch-five-yeses-first

**Topic:** Is your AI feature ready to launch?  
**Pillar:** A: AI Product Management · **Format:** decision-checklist · **Objective:** saves · **Depth:** beginner  
**Audience:** PMs preparing to launch AI features  
**Duration:** 25.67s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** An AI feature is ready to launch only when its eval passes a bar set in advance, red-team cases are handled, a fallback works, monitoring is live and rollback is tested; any “no” shrinks the launch.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Can you turn it off in 5 minutes? | Pointed question | 5 | 5 | 4 | 4 | 5 | **23** |
| 2 | Five yeses before an AI feature ships. | List promise | 4 | 5 | 3 | 4 | 5 | **21** |
| 3 | “The demo works” is not a launch criterion. | Contrarian | 3 | 5 | 4 | 4 | 4 | **20** |

**Selected:** "Can you turn it off in 5 minutes?" — Highest total (23/25): a specific, uncomfortable question that leads straight into the five-part launch gate.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Can you turn it off in 5 minutes? / If not, it isn’t ready to ship.
- **Voiceover (if enabled):** Can you turn it off in five minutes? If not, it isn’t ready to ship.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. gate — 0:03.0 → 0:14.0 (11.0s, frames 90–419)

- **Purpose:** The questions and the decision rule.
- **On-screen copy:** THE LAUNCH GATE / Ship only if all five are yes. / Eval set passes a bar set before testing · Red-team prompts tried, worst ones fixed · Fallback works when the model fails or times out · Dashboards and alerts live on day one · Kill switch tested, with a named owner / One “no” means a smaller rollout, not a full launch.
- **Voiceover (if enabled):** Ship only if all five are yes. The eval passes a bar you set before testing. Red-team prompts are tried and the worst fixed. The fallback works. Dashboards and alerts are live on day one. The kill switch is tested, with an owner. One no means a smaller rollout.
- **Visual composition:** 5 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 242.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.30s, tick @ 6.70s, tick @ 8.10s, tick @ 9.50s, chime @ 11.13s

### 3. no — 0:14.0 → 0:20.7 (6.7s, frames 420–619)

- **Purpose:** What to do with a “no”: shrink the launch.
- **On-screen copy:** IF ONE IS “NO” / Shrink the launch, don’t skip the gate. / INTERNAL No red-team yet → staff only · LIMITED No fallback → opt-in beta · BLOCKED No kill switch → don’t ship
- **Voiceover (if enabled):** No red-team yet? Staff only. No fallback? An opt-in beta. No kill switch? Don’t ship.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 26 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 14.00s, tick @ 14.53s, tick @ 15.40s, tick @ 16.27s

### 4. takeaway — 0:20.7 → 0:25.7 (5.0s, frames 620–769)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** Can’t undo it? Don’t ship it. / Save this for your launch review
- **Voiceover (if enabled):** Can’t undo it? Don’t ship it. Save this for your launch review.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 20.67s, chime @ 23.07s

## Voiceover edit plan

Full narration is 91 words ≈ 35.0s at a conversational 2.6 words/sec, versus 25.67s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 5.8 | no — extend by ~3.3s |
| gate | 11.0 | 18.8 | no — extend by ~8.3s |
| no | 6.7 | 5.8 | yes |
| takeaway | 5.0 | 4.6 | yes |

## Claims register

- **practitioner-opinion** — AI features should pass an eval bar, red-team testing, a working fallback, live monitoring and a tested rollback before full launch; gaps call for a limited rollout.
