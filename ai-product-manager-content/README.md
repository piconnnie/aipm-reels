# AI Product Manager — content engine

A reusable Remotion + React system for the **AI Product Manager** Instagram page: it turns a structured content file into a 1080×1920 reel, a cover, a caption, a storyboard and machine-readable publishing metadata, then runs quality gates and requires a human approval before anything can be posted.

> **Daily automation:** see [AUTOMATION.md](AUTOMATION.md) — Claude writes a reel every morning, GitHub Actions renders and checks it, you approve by merging a PR, and it posts to Instagram at a set time.

> Core rule: every post delivers one useful insight. The pipeline enforces structure; the judgement — topic, hook, the actual lesson — stays with you (or with Claude Code, working from the brief in `CONTENT_SYSTEM.md`).

---

## What's in the box

```
ai-product-manager-content/
  src/
    brand/          tokens.ts (colours, type scale, safe zones), fonts.ts (local font loading)
    components/     BrandBackground, BrandSignature + Monogram, ProgressIndicator,
                    KineticHeadline, Cards (PromptCard, MetricCard, StatusIcon),
                    AudioTracks (SoundDesignTrack, VoiceoverTrack, SubtitleTrack), EndCard, motion helpers
    scenes/         HookScene, CardsScene, TableScene, ComparisonScene, ChecklistScene,
                    DiagramScene, TerminalScene, TakeawayScene
    templates/      ReelTemplate (scene sequencing, transitions, audio), formats.json (10 formats)
    compositions/   Cover (1080×1920 still, text inside the 1080×1350 feed crop)
    content/        schema.ts (content contract), reels/*.json (one file per reel, auto-registered)
    Root.tsx, index.ts   Remotion entry: one Reel + one Cover composition per content file
  scripts/
    generate-content.mjs   scaffold a new reel from a brief + format
    build-package.mjs      caption, storyboard (.md), narration timing (.srt), metadata (.json)
    synth-audio.py         original music bed + SFX synthesised locally from scene cues
    render-content.mjs     render MP4 + cover (Remotion CLI, or local fallback engine)
    validate-content.mjs   content, visual-layout and technical QA gates + review frames
    approve.mjs            human approval gate (requires watched + listened confirmation)
    publish.mjs            refuses unapproved assets; prints manual posting checklist
    analyze-performance.mjs  baseline-relative analysis of imported Insights data
    sync-registry.mjs      auto-registers every reels/*.json for Remotion
    content-limits.mjs     copy-length/structure limits shared by validator and writer
    daily/                 automation: plan, write (Claude), archive, publish (Instagram), insights, topic scan
    test/                  offline publish-flow test against a mock Graph API
    local-render/          fallback renderer: Remotion-API shim + headless Chromium + ffmpeg
  public/            fonts/, audio/, brand/aipm-monogram.svg   (Remotion's static folder)
  data/topics/       backlog.json (topic ideas; weekly scan adds researched ones)
  data/performance/  performance.csv, report.md, index.json (feeds the planner)
  archive/<id>/      committed review package + state.json (approval, publish status)
  output/            reels/, covers/, captions/, metadata/, storyboards/, qa/
```

`public/` replaces the `assets/` folder from the original spec because it is Remotion's static-file directory (`staticFile()` reads from it).

## Install

Requirements: Node 18+ (tested on 22), Python 3 with `numpy` and `scipy` (audio), `ffmpeg`/`ffprobe` on PATH.

```bash
npm install            # remotion, @remotion/cli, react 19
pip install numpy scipy
```

Keep `remotion` and `@remotion/cli` on the **same** version (`npm ls remotion @remotion/cli`).

## Workflow for one reel

```bash
# 1. Scaffold (pick a format; pillar defaults to the most under-served vs the target mix)
npm run new -- --topic "RAG vs fine-tuning" --format a-vs-b --objective saves

# 2. Write the copy: replace every TODO in src/content/reels/<id>.json
#    (3 hooks with scores → pick one → script → caption → claims + sources),
npm run validate -- <id> --content-only       # content gates before spending render time

# 3. Preview and iterate
npm run studio                                # Remotion Studio with live reload

# 4. Package, render, check
npm run package  -- <id>
npm run render   -- <id>                      # synthesises audio, renders MP4 + cover
npm run validate -- <id>                      # all gates, review frames, contact sheet

# 5. Human review → approval → manual post
npm run approve  -- <id> --by "Your Name" --watched --listened
npm run publish  -- <id>                      # prints the posting checklist; never auto-posts

# 6. A week later: add a row to data/performance/performance.csv
npm run metrics
```

### Render engines

`render-content.mjs` uses the **Remotion CLI** when `node_modules/@remotion/cli` exists (`npx remotion render src/index.ts Reel-<id>` and `npx remotion still … Cover-<id>`). Otherwise, or with `--engine local`, it uses `scripts/local-render/`: the same scene components bundled with a small stand-in for the Remotion APIs this project uses (`Sequence`, `useCurrentFrame`, `interpolate`, `spring`, `Easing`, …), stepped frame-by-frame in headless Chromium and encoded with ffmpeg (H.264 High, yuv420p, CRF 18, AAC 192k, faststart). The local engine needs `esbuild` and `playwright` with Chromium; it also powers the layout checker in `validate`.

The sample reel in `output/` was rendered with the **local engine**, because this build environment had no npm registry access. Run `npm install && npm run render -- aipm-001-demo-prompts-not-evals` once on your machine to confirm the Remotion path; small differences in spring easing between the shim and Remotion are possible.

## Content model

Each reel is one JSON file conforming to `src/content/schema.ts`: the brief, three scored hook options and the selection rationale, scenes (type, duration, copy, storyboard notes, voiceover line, SFX cues), cover, caption, single primary CTA, audio, a claims register and repurposing ideas. Rendering code never contains copy.

**Scene types → typical use**

| Scene | Use for |
|---|---|
| `hook` | Opening line, fully legible on frame 0 |
| `cards` | Prompts, inputs, examples; optional per-card 3D flip to a new state (myth → reality, demo → real) |
| `table` | Structured comparisons as stacked rows (phone-legible) |
| `comparison` | Two metrics with bars and count-up; supports an on-screen ILLUSTRATIVE badge |
| `checklist` | Numbered questions + decision rule |
| `diagram` | Vertical pipeline with flow pulse and a limitation callout |
| `terminal` | Deterministic typing for commands / eval output |
| `takeaway` | One-line rule, one CTA, subtle end card |

The ten rotating formats (Mistake, Framework, A vs B, Architecture, PoC→Production, Interview, Build With Me, Myth vs Reality, Teardown, Decision Checklist) live in `src/templates/formats.json` as default scene sequences.

## Brand system

Palette, type scale and safe zones are in `src/brand/tokens.ts`. Navy and off-white are the foundation; indigo/cyan are accents; green and amber are used only for pass/risk semantics.

**Fonts.** The spec calls for Space Grotesk / Inter / JetBrains Mono. Space Grotesk and JetBrains Mono weren't available offline here, so the system currently ships **Inter Display Bold** (headlines), **Inter** (body) and **DejaVu Sans Mono** (labels), all loaded from `public/fonts` (no network at render time). To switch: add the font files to `public/fonts`, edit the `faces` list in `src/brand/fonts.ts`, re-render. All three faces are under open licences (SIL OFL / Bitstream Vera-derived); keep their licence files alongside if you redistribute.

**Monogram.** `public/brand/aipm-monogram.svg` is a *proposed* mark, not a registered or approved logo.

**Safe zone.** Essential content sits within x 96–930, y 250–1500 (clear of the Reels header, right action rail and bottom caption area). The validator checks every visible text element against this box on sampled frames, and checks the cover against the centred 1080×1350 feed crop.

**Motion.** All animation is frame-driven (`interpolate`, `spring`), with no `Math.random` or wall-clock time. One transition vocabulary: short rise-and-fade between scenes, or a hard cut for continuity.

## Audio

`scripts/synth-audio.py` generates an original bed (slow Am9–Fmaj7–Cmaj7–G6 pad + soft 100 BPM pulse) and SFX (whoosh, tick, chime, low, impact) placed on the exact frames listed in each scene's `sfx` cues, then masters to ≈ −16 LUFS with a peak limiter at −1.5 dBFS. Deterministic (fixed seeds).

**Voiceover.** No TTS provider is wired in. The storyboard includes a per-scene narration script and a fit table (narration length vs picture), and the `.srt` gives timing. To add narration: produce `public/audio/<id>-vo.wav` (any TTS provider or a recording), set `audio.voiceover` and `brief.voiceover: true`, lower `audio.bedVolume` to ~0.25, extend any scene the fit table flags, and render with the Remotion engine (it mixes VO + bed; burned-in subtitles turn on automatically).

## Quality gates

`npm run validate -- <id>` writes `output/qa/<id>/report.md` and updates the metadata:

- **Content:** three hooks, hook ≤10 words, one-sentence insight, 15–35s, no scene <1.5s, exactly one CTA (on-screen = caption), illustrative numbers labelled on screen and in the caption, every `verified-fact` claim has a dated source, no hype phrases, 3–8 hashtags, caption ≤2,200 chars, cover headline 3–7 words.
- **Visual:** all visible text inside the safe zone and not truncated (DOM measurement on sampled frames); cover inside the feed crop.
- **Technical:** 1080×1920, 30/1 fps, H.264 yuv420p, exact frame count and duration, AAC 48 kHz stereo, loudness −20…−12 LUFS, true peak ≤ −1 dBTP, full decode with zero errors, no black frames, review frames (first, last, every scene mid-point, both sides of every cut) and a contact sheet.

Automated gates can't watch or listen. Those checks stay **pending** until `approve` is run with `--watched --listened`; `publish` refuses anything unapproved or modified after approval.

## Publishing and analytics

Publishing is intentionally manual. `publish.mjs` contains no API client; adding one requires an Instagram professional account, a Meta app with the relevant content-publishing permissions, and a publicly reachable video URL. Analytics start as a manual CSV import; the analyzer compares every post with the account's own median, marks groups with fewer than 3 posts as insufficient, and proposes a one-variable next test.

## Secrets

Copy `.env.example` to `.env` for any optional integration. Nothing in the default workflow needs a key; never commit `.env`.
