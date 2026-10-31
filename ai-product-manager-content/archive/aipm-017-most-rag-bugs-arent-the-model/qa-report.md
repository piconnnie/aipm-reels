# QA report — aipm-017-most-rag-bugs-arent-the-model

Status: **automated-passed** · 39/39 passed · 0 error(s) · 0 warning(s)

| Gate | Check | Result | Detail |
|---|---|---|---|
| content | No TODO placeholders left | ✅ |  |
| content | Copy and structure fit the layout limits | ✅ |  |
| content | Three hook variants generated | ✅ | 3 variants |
| content | Selected hook is short enough to read in ~2s | ✅ | 9 words |
| content | First scene is the hook | ✅ |  |
| content | Core insight stated in one sentence | ✅ | When a RAG answer is wrong, the cause is usually upstream of the model: the right chunk never reached the prompt, so debug retrieval before you blame or swap the model. |
| content | Duration within 15–35s | ✅ | 26.0s |
| content | No scene shorter than 1.5s | ✅ |  |
| content | Style names are valid | ✅ |  |
| content | Exactly one on-screen CTA, matching primaryCta | ✅ | Save this for the next wrong answer |
| content | Caption asks for one action only | ✅ | CTA verbs found: save |
| content | Every verified-fact claim has a dated source | ✅ |  |
| content | No hype / bait phrases | ✅ |  |
| content | Hashtags: small relevant set (3–8) | ✅ | 5 |
| content | Caption under Instagram 2,200-char limit | ✅ | 527 chars |
| content | Cover headline 3–7 words | ✅ | 6 words |
| visual | All visible text inside Instagram safe zone | ✅ |  |
| visual | No truncated/clipped text | ✅ |  |
| visual | Cover text inside centred 1080×1350 feed crop | ✅ |  |
| technical | Resolution 1080×1920 | ✅ | 1080×1920 |
| technical | Frame rate 30 fps | ✅ | 30/1 |
| technical | Video codec H.264, yuv420p | ✅ | h264 yuv420p High |
| technical | Frame count matches composition | ✅ | 780 vs 780 |
| technical | Duration matches composition (±0.1s) | ✅ | 26.00s vs 26.00s |
| technical | Audio AAC 48 kHz stereo | ✅ | aac 48000 2ch |
| technical | Integrated loudness in −20…−12 LUFS | ✅ | -17.5 LUFS |
| technical | True peak ≤ −1.0 dBTP (no clipping) | ✅ | -2.4 dBTP |
| technical | IG: moov atom at front of file (faststart) | ✅ | moov@36 mdat@29650 |
| technical | IG: no MP4 edit lists | ✅ |  |
| technical | IG: video bitrate ≤ 25 Mbps | ✅ | 1.39 Mbps |
| technical | IG: audio bitrate ≤ 160 kbps (target 128) | ✅ | 130 kbps |
| technical | IG: file size ≤ 300 MB | ✅ | 4.7 MB |
| technical | IG: JPEG cover ≤ 8 MB | ✅ | 112 KB |
| technical | Full decode with zero errors (file plays) | ✅ |  |
| technical | No black frames/gaps | ✅ |  |
| technical | Review frames extracted from final MP4 | ✅ | 12 frames |
| technical | Contact sheet built | ✅ | output/qa/aipm-017-most-rag-bugs-arent-the-model/contact-sheet.png |
| technical | Cover 1080×1920 PNG | ✅ | 1080×1920 |
| technical | All local asset dependencies present | ✅ |  |

## Manual checks still required before approval
- [ ] Watch the full MP4 at normal speed on a phone (pacing, readability, transitions).
- [ ] Listen to the final audio on headphones and a phone speaker (mix, no harshness).
- [ ] Read the caption once more in Instagram's composer before posting.
