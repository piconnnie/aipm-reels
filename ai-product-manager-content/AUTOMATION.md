# Daily automation

Every morning a GitHub Actions workflow writes a new reel with Claude, renders it with Remotion, runs every quality gate, and opens a **review pull request** with the cover, a frame contact sheet and the MP4. **Merging the PR approves it.** The approved reel is posted to Instagram at the daily slot (default 19:00 IST). Closing the PR rejects it; nothing is posted.

```
06:00 IST  AIPM · Daily reel
           plan topic (pillar mix, format rotation, no repeats, performance-weighted)
           → Claude writes the reel JSON (web research when the topic needs it)
           → validator: copy limits + safe-zone layout check → revise (≤3 rounds)
           → Claude editor pass: hook, insight, accuracy, intrigue, clarity, brand → revise
           → render (Remotion) → Instagram spec conform → full QA → previews to a pre-release
           → review PR  [daily-reel]  (+ [needs-attention] if the editor wasn't satisfied)

you        merge = approve · edit the JSON in the PR = auto re-render · close = reject

19:05 IST  AIPM · Approve & publish   (also runs the moment you merge)
           oldest approved reel, max 1/day, after AIPM_POST_TIME
           → verifies the file hashes match what passed QA and what you approved
           → Instagram Graph API: create REELS container → wait FINISHED → publish
           → comments the permalink on the PR

Sunday     AIPM · Weekly topics & insights
           Claude web-scans for timely topics (with sources) → backlog
           Instagram insights → data/performance → planner weighting
```

Nothing is ever posted without a merged PR. If 3 reels are already waiting for review, the daily run skips generation instead of piling up drafts.

---

## One-time setup (≈30 minutes, plus Meta's app setup)

### 1. Put the code in the repo

This repository already has the right layout (`ai-product-manager-content/` + `.github/`). If you move it elsewhere, keep both folders at the repository root.

### 2. Allow Actions to open PRs

Repo → **Settings → Actions → General → Workflow permissions**:
- select **Read and write permissions**
- tick **Allow GitHub Actions to create and approve pull requests**

### 3. Add the Claude API key

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `ANTHROPIC_API_KEY` | An API key from the Claude Console (platform.claude.com → API keys) |

### 4. Try it

Actions → **AIPM · Daily reel** → **Run workflow**.
- Leave everything blank to generate a new reel, or
- put `aipm-001-demo-prompts-not-evals` (or `aipm-002-spec-how-your-ai-feature-fails`) in **reel_id** to send an existing reel through review.

A PR appears in ~10–15 minutes. Turn on GitHub mobile notifications for the repo to get it on your phone.

Until Instagram is connected, merging a PR still works: the publish run comments that the reel needs manual posting and links the files.

### 5. Connect Instagram

Requirements: your Instagram account must be a **professional account** (Creator or Business) — Instagram app → Settings → Account type and tools.

Choose one login type. Meta's dashboards change often, so follow the current screens using the names below.

**Option A — Instagram API with Instagram Login (simplest; no Facebook Page needed)**
1. developers.facebook.com → **Create app** → choose the Instagram use case (Instagram API with Instagram Login).
2. Permissions: `instagram_business_basic` and `instagram_business_content_publish`.
3. Under the app's **Roles**, add your Instagram account as an Instagram tester and accept the invite in Instagram (Settings → Website permissions / Apps and websites → Tester invites). An account with a role on the app can use it without App Review; check the App Dashboard if Meta asks for more.
4. In the API setup screen, **generate an access token** for your account. It is a long-lived token (~60 days).
5. Add secrets `IG_ACCESS_TOKEN` and `IG_USER_ID` (the check in step 6 prints the correct user id if you're unsure), and the variable `IG_LOGIN` = `instagram`.
6. Token renewal: add a `GH_SECRETS_PAT` secret (fine-grained GitHub token for this repo with **Secrets: read and write**) and **AIPM · Refresh Instagram token** renews it monthly. Without it, the workflow opens a reminder issue instead.

**Option B — Instagram API with Facebook Login (needs a Facebook Page linked to the account)**
1. Create a Business app with Facebook Login for Business; permissions `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`.
2. Use a Page access token derived from a long-lived user token (these don't expire on the 60-day cycle).
3. Secrets `IG_ACCESS_TOKEN`, `IG_USER_ID`; variable `IG_LOGIN` = `facebook`.
4. This option uploads the MP4 bytes directly to Meta (`IG_UPLOAD_MODE` defaults to `resumable`), so no public video URL is involved.

Then run **AIPM · Check Instagram setup**. It lists anything missing (token, permissions, account type, publishing quota) without printing secrets.

**About video URLs (Option A).** In URL mode Meta downloads the video from a public link. The publisher resolves the GitHub release download link to its direct file URL just before creating the container. This has not been verified against Meta's downloader. If a post fails with a media download/format error, either switch to Option B, or host files yourself (S3/R2/any CDN), upload `<id>.mp4` and `<id>.jpg` there, and set the variable `AIPM_PUBLIC_BASE_URL` to that folder's URL.

---

## Day to day

- **Morning:** open the PR. Watch the MP4 (the "Watch the reel" link), skim the script table, the editor scores and the claims/sources.
- **Approve:** merge. It posts at the next slot (or right away if the slot has passed and nothing was posted today).
- **Fix a word:** edit `src/content/reels/<id>.json` in the PR (GitHub web or mobile). The reel re-renders, QA re-runs and the preview updates. If the edit breaks a layout limit, the PR gets a comment explaining which check failed.
- **Reject:** close the PR. Its topic becomes available again.
- **Post a specific idea:** Actions → AIPM · Daily reel → Run workflow with a **topic** (and optional format/pillar).
- **Add ideas:** append to `data/topics/backlog.json` with `"status": "open"`.
- **Pause:** Actions → AIPM · Daily reel → ⋯ → Disable workflow.

## Settings (repo variables, all optional)

| Variable | Default | Meaning |
|---|---|---|
| `AIPM_POST_TIME` | `19:00` | Earliest local posting time. Also edit the cron in `aipm-publish.yml` to match. |
| `AIPM_TZ` | `Asia/Kolkata` | Time zone for the slot and the daily cap |
| `AIPM_MAX_PER_DAY` | `1` | Posts per day |
| `AIPM_MAX_OPEN_REVIEWS` | `3` | Skip generation when this many PRs await review |
| `AIPM_MODEL` | `claude-opus-5-5` | Writer/editor model (`claude-sonnet-5-5` is cheaper; `claude-fable-5-1` is stronger and pricier) |
| `IG_LOGIN` | `instagram` | `instagram` or `facebook` |
| `IG_API_VERSION` | `v26.0` | Graph API version |
| `IG_UPLOAD_MODE` | `url` (IG login) / `resumable` (FB login) | How the video reaches Meta |
| `AIPM_PUBLIC_BASE_URL` | — | Your own public folder for MP4/JPEG files (URL mode) |
| `AIPM_INSIGHT_METRICS` | `reach,saved,shares,views,…` | Insight metric names to request (Meta renames these between versions) |

The daily generation time is the cron in `aipm-daily-reel.yml` (`30 0 * * *` = 06:00 IST). GitHub can start scheduled runs late at busy times.

## Costs

- **GitHub Actions:** free for public repositories.
- **Claude API:** each PR shows the estimated cost of writing that reel. With `claude-opus-5-5` ($4 / $20 per million input/output tokens) expect very roughly **$0.40–$1.20 per reel**, depending on revision rounds. The weekly topic scan adds web searches ($10 per 1,000) plus tokens, typically well under $1.
- **Remotion:** free for individuals and very small companies; larger companies need a Remotion company license (see remotion.dev/license).

## What the automation can't do

- It can't judge taste the way you can. The editor pass and QA gates catch overclaims, unlabelled numbers, layout problems and weak hooks, but **your merge is the real quality gate**.
- It has no voiceover (no TTS provider configured). Reels are text-on-screen with an original synthesized soundtrack.
- Instagram insight metric names change between Graph API versions. Unsupported metrics are skipped, never estimated; the CSV can always be filled in by hand.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Daily run fails at "Write today's reel" | Check the `ANTHROPIC_API_KEY` secret. If the writer couldn't pass validation in 3 rounds, the run log lists the failing limits; it tries a fresh topic the next day. |
| `gh pr create` fails with a permissions error | Step 2 above (allow Actions to create PRs). |
| Publish says "not approved" | The PR must be merged (not closed) and carry the `daily-reel` label. |
| Container status `ERROR` | Usually the video URL couldn't be fetched. See "About video URLs". |
| "hash mismatch" | The release files changed after approval. Re-run review for that reel (Daily reel → reel_id) and merge the new PR. |
| Scheduled workflows stopped | GitHub disables schedules after 60 days without repo activity; the daily commits normally prevent this. Re-enable in the Actions tab. |
