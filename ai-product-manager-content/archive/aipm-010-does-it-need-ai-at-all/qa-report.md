# QA report — aipm-010-does-it-need-ai-at-all

Status: **automated-passed** · 39/39 passed · 0 error(s) · 0 warning(s)

| Gate | Check | Result | Detail |
|---|---|---|---|
| content | No TODO placeholders left | ✅ |  |
| content | Copy and structure fit the layout limits | ✅ |  |
| content | Three hook variants generated | ✅ | 3 variants |
| content | Selected hook is short enough to read in ~2s | ✅ | 5 words |
| content | First scene is the hook | ✅ |  |
| content | Core insight stated in one sentence | ✅ | Use AI only when a fixed rule can't do the job, occasional errors are acceptable or catchable, and you have data to test it; otherwise ship the rule first. |
| content | Duration within 15–35s | ✅ | 22.8s |
| content | No scene shorter than 1.5s | ✅ |  |
| content | Style names are valid | ✅ |  |
| content | Exactly one on-screen CTA, matching primaryCta | ✅ | Save this for your next roadmap review |
| content | Caption asks for one action only | ✅ | CTA verbs found: save |
| content | Every verified-fact claim has a dated source | ✅ |  |
| content | No hype / bait phrases | ✅ |  |
| content | Hashtags: small relevant set (3–8) | ✅ | 4 |
| content | Caption under Instagram 2,200-char limit | ✅ | 406 chars |
| content | Cover headline 3–7 words | ✅ | 6 words |
| visual | All visible text inside Instagram safe zone | ✅ |  |
| visual | No truncated/clipped text | ✅ |  |
| visual | Cover text inside centred 1080×1350 feed crop | ✅ |  |
| technical | Resolution 1080×1920 | ✅ | 1080×1920 |
| technical | Frame rate 30 fps | ✅ | 30/1 |
| technical | Video codec H.264, yuv420p | ✅ | h264 yuv420p High |
| technical | Frame count matches composition | ✅ | 684 vs 684 |
| technical | Duration matches composition (±0.1s) | ✅ | 22.80s vs 22.80s |
| technical | Audio AAC 48 kHz stereo | ✅ | aac 48000 2ch |
| technical | Integrated loudness in −20…−12 LUFS | ✅ | -17.7 LUFS |
| technical | True peak ≤ −1.0 dBTP (no clipping) | ✅ | -2.6 dBTP |
| technical | IG: moov atom at front of file (faststart) | ✅ | moov@36 mdat@26438 |
| technical | IG: no MP4 edit lists | ✅ |  |
| technical | IG: video bitrate ≤ 25 Mbps | ✅ | 1.93 Mbps |
| technical | IG: audio bitrate ≤ 160 kbps (target 128) | ✅ | 130 kbps |
| technical | IG: file size ≤ 300 MB | ✅ | 5.6 MB |
| technical | IG: JPEG cover ≤ 8 MB | ✅ | 72 KB |
| technical | Full decode with zero errors (file plays) | ✅ |  |
| technical | No black frames/gaps | ✅ |  |
| technical | Review frames extracted from final MP4 | ✅ | 12 frames |
| technical | Contact sheet built | ✅ | output/qa/aipm-010-does-it-need-ai-at-all/contact-sheet.png |
| technical | Cover 1080×1920 PNG | ✅ | 1080×1920 |
| technical | All local asset dependencies present | ✅ |  |

## Manual checks still required before approval
- [ ] Watch the full MP4 at normal speed on a phone (pacing, readability, transitions).
- [ ] Listen to the final audio on headphones and a phone speaker (mix, no harshness).
- [ ] Read the caption once more in Instagram's composer before posting.
