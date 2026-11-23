# Storyboard — aipm-036-before-ai-reads-your-internal-data

**Topic:** Questions to ask before connecting an LLM to internal data  
**Pillar:** D: Enterprise AI · **Format:** decision-checklist · **Objective:** shares · **Depth:** intermediate  
**Audience:** PMs and IT leads rolling out internal AI assistants  
**Duration:** 21s @ 30fps · 1080×1920 · **Voiceover:** off

**Core insight (one sentence):** Don't connect an LLM to internal data until retrieval enforces each user's existing permissions and you've decided what gets logged and kept.

## Hook options

| # | Hook | Angle | Spec | Rel | Cur | Cred | Comp | Total |
|---|---|---|---|---|---|---|---|---|
| 1 ✅ | Before your AI reads the company wiki… | Timely setup | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | Your chatbot can see what the intern can’t. | Risk framing | 4 | 5 | 5 | 3 | 4 | **21** |
| 3 | Permissions don’t survive the vector database. | Technical claim | 4 | 4 | 4 | 3 | 3 | **18** |

**Selected:** "Before your AI reads the company wiki…" — Highest total (23/25): names the moment of decision, and the reel gives four questions in order.

## Scene-by-scene

### 1. hook — 0:00.0 → 0:03.0 (3.0s, frames 0–89)

- **Purpose:** State the idea so it is clear from frame 0.
- **On-screen copy:** Before your AI reads the company wiki… / Ask these four questions first.
- **Voiceover (if enabled):** Before your AI reads the company wiki, ask these four questions.
- **Visual composition:** Display headline with highlighted phrase; slate sub-line.
- **Animation:** Readable on frame 0; underline sweep at 6; sub rises at 18.
- **Transition in:** none (first frame fully composed)
- **Sound cues:** impact @ 0.20s

### 2. questions — 0:03.0 → 0:11.7 (8.7s, frames 90–349)

- **Purpose:** The four questions, in order.
- **On-screen copy:** ASK BEFORE YOU CONNECT / Four questions, in this order. / Who can see each document today? · Is that checked at retrieval, per user? · What gets logged: prompts, answers, sources? · How long is it kept, and who reads the logs? / If retrieval ignores user permissions, don’t connect it yet.
- **Voiceover (if enabled):** Who can see each document today? Is that checked at retrieval, for each user? What gets logged: prompts, answers, sources? How long is it kept, and who can read the logs? If retrieval ignores user permissions, don't connect it yet.
- **Visual composition:** 4 numbered items; cyan rule box.
- **Animation:** Items every 42 frames from 24; rule at 198.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 3.00s, tick @ 3.90s, tick @ 5.30s, tick @ 6.70s, tick @ 8.10s, chime @ 9.67s

### 3. flags — 0:11.7 → 0:16.0 (4.3s, frames 350–479)

- **Purpose:** Phrases that should stop the rollout.
- **On-screen copy:** RED FLAGS / Stop if you hear this. / RED FLAG “We index everything once” · RED FLAG “The bot has admin access” · RED FLAG “Logs? The vendor has them”
- **Voiceover (if enabled):** Red flags: we index everything once. The bot has admin access. Logs? The vendor has them.
- **Visual composition:** Kicker + headline; 3 tagged cards.
- **Animation:** Cards pop every 20 frames from 10.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 11.67s, low @ 12.20s, low @ 12.87s, low @ 13.53s

### 4. takeaway — 0:16.0 → 0:21.0 (5.0s, frames 480–629)

- **Purpose:** Memorable rule + one CTA.
- **On-screen copy:** The bot should know only what the user can. / Send this to your security lead
- **Voiceover (if enabled):** The bot should know only what the user can. Send this to your security lead.
- **Visual composition:** Takeaway lines, last highlighted; CTA pill; end card.
- **Animation:** Lines rise; CTA at 40; end card at 70.
- **Transition in:** fade-up
- **Sound cues:** whoosh @ 16.00s, chime @ 18.40s

## Voiceover edit plan

Full narration is 82 words ≈ 31.5s at a conversational 2.6 words/sec, versus 21s of picture.
Voiceover is OFF for this cut (no TTS provider configured). To add it: generate or record one file per the SRT below, save to public/audio/<id>-vo.wav, set audio.voiceover and brief.voiceover=true, lower audio.bedVolume to ~0.25, and re-render. If any scene narration runs longer than its picture, extend that scene's durationInFrames rather than speeding up the read.

| Scene | Picture (s) | Narration est. (s) | Fits? |
|---|---|---|---|
| hook | 3.0 | 4.2 | no — extend by ~1.7s |
| questions | 8.7 | 15.4 | no — extend by ~7.2s |
| flags | 4.3 | 6.2 | no — extend by ~2.3s |
| takeaway | 5.0 | 5.8 | no — extend by ~1.3s |

## Claims register

- **practitioner-opinion** — Internal AI assistants should enforce each user's existing document permissions at retrieval time, and logging and retention should be decided before connecting internal data.
