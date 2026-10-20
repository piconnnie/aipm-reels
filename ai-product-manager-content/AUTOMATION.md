# Daily automation

**It runs completely free by default:** a public GitHub repo (free Actions minutes), reels from a pre-written content queue (no AI model at run time), and Instagram's free Graph API. Paid writers are off unless you opt in.

Every morning a GitHub Actions workflow takes a new reel, renders it with Remotion, runs every quality gate, and opens a **review pull request** with the cover, a frame contact sheet and the MP4. **Merging the PR approves it.** The approved reel is posted to Instagram at the daily slot (default 19:00 IST). Closing the PR rejects it; nothing is posted.

```
06:00 IST  AIPM · Daily reel
           plan topic (pillar mix, format rotation, no repeats, performance-weighted; used by opt-in writers)
           → writer:
               default   content queue: next pre-written draft  (data/queue, no model, free)
               opt-in    Claude Code on a Claude subscription   (AIPM_WRITER=subscription)
               opt-in    Claude API, pay per token               (AIPM_WRITER=api)
             every draft is checked against the copy limits + safe-zone layout;
             if an opt-in writer fails, that day falls back to the queue
           → when 5 or fewer drafts are left: a "queue-low" issue reminds you to refill
           → render (Remotion) → Instagram spec conform → full QA → previews to a pre-release
           → review PR  [daily-reel]  (+ [needs-attention] if the editor wasn't satisfied)

you        merge = approve · edit the JSON in the PR = auto re-render · close = reject

hourly     AIPM · Approve & publish   (also runs the moment you merge)
           (auto-approve on) after AIPM_POST_TIME: merge the oldest waiting review PR,
             one at a time, skipping PRs on `hold` or flagged needs-attention
           records approval for every merged reel PR (so none is lost)
           oldest approved reel, max 1/day, once the local time passes AIPM_POST_TIME
           → verifies the file hashes match what passed QA and what you approved
           → Instagram Graph API: create REELS container → wait FINISHED → publish
           → comments the permalink on the PR

Sunday     AIPM · Weekly topics & insights
           Instagram insights → data/performance → planner weighting
           (opt-in only) Claude web-scans for timely topics (with sources) → backlog
```

**Control panel:** everything below can also be done from the web control panel (see "Control panel" further down): review and approve, make a reel, post now, pause, change the posting time, manage the queue.

Nothing is ever posted without a merged PR. If 3 reels are already waiting for review, the daily run skips generation instead of piling up drafts.

---

## One-time setup (≈30 minutes, plus Meta's app setup)

### 1. Put the code in the repo

This repository already has the right layout (`ai-product-manager-content/` + `.github/`). If you move it elsewhere, keep both folders at the repository root.

### 2. Allow Actions to open PRs

Repo → **Settings → Actions → General → Workflow permissions**:
- select **Read and write permissions**
- tick **Allow GitHub Actions to create and approve pull requests**

### 3. How reels get written (free by default)

**Default — the content queue, free.** Each day takes the next pre-written draft from `data/queue/`. Drafts are written ahead of time and pass the same copy, layout and claim checks as any reel. Nothing to set up.

- `node scripts/daily/dequeue.mjs --status` lists what's left (`--count` prints just the number).
- When 5 or fewer drafts remain, the daily run opens (or comments on) an issue labelled **queue-low**. Turn on GitHub notifications to see it.
- **Automatic refill:** a weekly scheduled Claude task (Mondays, 09:57 IST) runs `scripts/daily/refill-plan.mjs` and tops the queue back up to ~21 drafts, following [`data/queue/REFILL.md`](data/queue/REFILL.md). It writes and validates the drafts and commits them to `main`. It runs on your Claude plan; there's no API bill and nothing to set up in GitHub. Manage it from your Claude scheduled tasks.
- **To refill by hand:** in a Claude chat, ask: *"write the next batch of queue drafts for aipm-reels"*. Claude writes and validates them; commit them to `data/queue/` or let Claude push them. Ten drafts = ten days.
- Drafts are never deleted; a draft counts as used once a reel carries its `queueId`. A draft that has become too similar to a newer reel is skipped automatically.

**Optional, paid — a model writes each reel at run time.** Off unless you set the repo variable `AIPM_WRITER`. Adding a secret alone never turns these on.

- `AIPM_WRITER=subscription` + secret `CLAUDE_CODE_OAUTH_TOKEN`: Claude Code on a Claude Pro, Max, Team or Enterprise plan (no API bill; counts toward the plan's usage limits). Create the token with `claude setup-token` on your computer; the Claude GitHub App must be installed on the repo.
- `AIPM_WRITER=api` + secret `ANTHROPIC_API_KEY`: Claude API, pay per token (see Costs).

Either one also enables the weekly topic scan. If the run fails (plan limit, auth error), that day's reel comes from the queue. If the variable is set but the secret is missing, the run warns and uses the queue.

### 4. Try it

Actions → **AIPM · Daily reel** → **Run workflow**.
- Leave everything blank to make today's reel (it takes the next queue draft, or uses the writer you opted into), or
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
5. Add the secret `IG_ACCESS_TOKEN`. That's all the publisher needs: the account id is looked up from the token (`IG_USER_ID` is optional with this login type). `IG_LOGIN` defaults to `instagram`.
6. Token renewal: add a `GH_SECRETS_PAT` secret (fine-grained GitHub token for this repo with **Secrets: read and write**) and **AIPM · Refresh Instagram token** renews it monthly. Without it, the workflow opens a reminder issue instead.

**Option B — Instagram API with Facebook Login (needs a Facebook Page linked to the account)**
1. Create a Business app with Facebook Login for Business; permissions `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`.
2. Use a Page access token derived from a long-lived user token (these don't expire on the 60-day cycle).
3. Secrets `IG_ACCESS_TOKEN`, `IG_USER_ID`; variable `IG_LOGIN` = `facebook`.
4. This option uploads the MP4 bytes directly to Meta (`IG_UPLOAD_MODE` defaults to `resumable`), so no public video URL is involved.

Then run **AIPM · Check Instagram setup**. It lists anything missing (token, permissions, account type, publishing quota) without printing secrets.

**About video URLs (Option A).** In URL mode Meta downloads the video from a public link. The publisher resolves the GitHub release download link to its direct file URL just before creating the container. This has not been verified against Meta's downloader. If a post fails with a media download/format error, either switch to Option B, or host files yourself (S3/R2/any CDN), upload `<id>.mp4` and `<id>.jpg` there, and set the variable `AIPM_PUBLIC_BASE_URL` to that folder's URL.

---

## Control panel (GitHub Pages)

A Streamlit app that runs entirely in your browser and controls the pipeline through the GitHub API. Nothing to host or pay for.

**Turn it on (once):** repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**. Then Actions → **AIPM · Control panel (GitHub Pages)** → Run workflow (it also runs on every change to `control-panel/`). The page is at `https://<your-user>.github.io/aipm-reels/`.

**Sign in:** paste a fine-grained GitHub token limited to this repo, with Actions, Contents, Pull requests and Variables set to *Read and write*, plus Issues *Read* (and optionally Secrets *Read*, which only shows whether Instagram is connected). The panel shows these steps too. The token stays in the browser tab's memory and is sent only to `api.github.com`; closing the tab forgets it. Use **Explore with sample data** to look around without a token.

| Tab | What you can do |
|---|---|
| Overview | Drafts left, reels waiting, approved, posted; recent posts with links; failures; status of each workflow |
| Review | Cover + video for each reel waiting, QA and editor notes; **Approve** (merges the PR) or **Reject** (closes it, with an optional reason) |
| Make a reel | Make one now; send an existing reel to review; **post an approved reel now** (or dry-run); check Instagram setup; import insights; refresh the token |
| Queue | Every draft and whether it's been used; upload new drafts (they're renumbered automatically) |
| Settings | Pause/resume the daily reel, posting and weekly import; posting time, time zone, posts per day, review limit, queue warning level, writer, Instagram login type |

Every irreversible button asks for confirmation. The first load takes ~20 seconds while Python starts in the browser.

## Auto-approve

With `AIPM_AUTO_APPROVE=true` (control panel → Settings → Auto-approve), you don't have to merge anything. Each morning's reel still opens a review PR, and the time until `AIPM_POST_TIME` is your veto window:

- do nothing → at the posting time the oldest waiting reel is approved and posted;
- **Reject** (close the PR) → it's never posted;
- **Hold** (the `hold` label, or the Hold button in the panel) → it waits for you; you can still approve it by hand;
- reels the editor flagged **needs-attention** always wait for you (only possible with a paid writer).

Only one reel is approved at a time and the daily cap still applies, so a backlog posts one per day rather than all at once. Every automated QA gate still runs before a review PR exists; a reel that fails QA never gets a PR.

## Look and sound (variety)

Every reel gets a `style` with three parts, chosen automatically so consecutive reels always differ:

| Part | Options |
|---|---|
| `theme` | `midnight` (navy + cyan), `ember` (charcoal + orange/amber), `mint` (green + lime), `grape` (violet + pink), `ocean` (teal + aqua), `paper` (light: cream + indigo/tomato) — each with its own background texture |
| `music` | `glow` (warm pad, soft pulse), `drive` (122 bpm four-on-the-floor), `lofi` (84 bpm swung beat, electric piano), `arcade` (bright arpeggios), `cinematic` (drones, big drums) |
| `motion` | `rise`, `slide`, `zoom` scene transitions; every reel also gets an accent sweep at scene changes and a background that pulses on the beat |

The rotation follows the reel number (theme n mod 6, music (n+2) mod 5, motion n mod 3), so the same combination only comes back after 30 reels. To choose yourself, edit `"style": {"theme": "paper", "music": "lofi", "motion": "zoom"}` in the reel's JSON in its review PR; it re-renders automatically and the validator rejects unknown names. All music is synthesized from scratch in the pipeline (no stock tracks, no licensing).

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
| `AIPM_POST_TIME` | `19:00` | Earliest local posting time (checked hourly, so changes apply within the hour) |
| `AIPM_TZ` | `Asia/Kolkata` | Time zone for the slot and the daily cap |
| `AIPM_MAX_PER_DAY` | `1` | Posts per day |
| `AIPM_MAX_OPEN_REVIEWS` | `3` | Skip generation when this many PRs await review |
| `AIPM_AUTO_APPROVE` | `false` | `true` = each reel approves itself at the posting time unless you close its PR or label it `hold` before then |
| `AIPM_WRITER` | `queue` | `queue` (free), or opt into a paid writer: `subscription` or `api` |
| `AIPM_QUEUE_LOW` | `5` | Open a queue-low issue when this many drafts or fewer are left |
| `AIPM_MODEL` | `claude-opus-5-5` | Paid writers only: writer/editor model (`claude-sonnet-5-5` is cheaper; `claude-fable-5-1` is stronger and pricier) |
| `IG_LOGIN` | `instagram` | `instagram` or `facebook` |
| `IG_API_VERSION` | `v26.0` | Graph API version |
| `IG_UPLOAD_MODE` | `url` (IG login) / `resumable` (FB login) | How the video reaches Meta |
| `AIPM_PUBLIC_BASE_URL` | — | Your own public folder for MP4/JPEG files (URL mode) |
| `AIPM_INSIGHT_METRICS` | `reach,saved,shares,views,…` | Insight metric names to request (Meta renames these between versions) |

The daily generation time is the cron in `aipm-daily-reel.yml` (`30 0 * * *` = 06:00 IST). GitHub can start scheduled runs late at busy times.

## Costs

**Default setup: $0.**

- **GitHub Actions:** free for public repositories. (Private repos get a monthly free allowance; a daily render fits in it, but keep the repo public to stay at $0 with headroom.)
- **Content queue (default):** free. Refilling it happens in a normal Claude chat, with no API key or GitHub secret involved.
- **Instagram Graph API:** free.
- **Claude subscription (opt-in):** no extra charge on a paid plan; runs count toward its usage limits.
- **Claude API (opt-in):** each PR shows the estimated cost of writing that reel. With `claude-opus-5-5` ($4 / $20 per million input/output tokens) expect very roughly **$0.40–$1.20 per reel**, depending on revision rounds. The weekly topic scan adds web searches ($10 per 1,000) plus tokens, typically well under $1.
- **Remotion:** free for individuals and very small companies; larger companies need a Remotion company license (see remotion.dev/license).

## What the automation can't do

- It can't judge taste the way you can. The editor pass and QA gates catch overclaims, unlabelled numbers, layout problems and weak hooks, but **your merge is the real quality gate**.
- GitHub Models' free tier isn't used: its per-request limits (about 8k tokens in, 4k out) are too small for the brand brief plus a full reel.
- It has no voiceover (no TTS provider configured). Reels are text-on-screen with an original synthesized soundtrack.
- Instagram insight metric names change between Graph API versions. Unsupported metrics are skipped, never estimated; the CSV can always be filled in by hand.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Daily run fails at "Finalize today's reel" with "queue is empty" | The queue ran out. Ask Claude in chat for the next batch of queue drafts and commit them to `data/queue/`. Nothing is posted on days without a reel. |
| A paid secret is set but reels still come from the queue | Expected: paid writers need the `AIPM_WRITER` variable too. |
| The Claude Code step fails with an "actor is a bot" or permission message | Scheduled runs are attributed to whoever last edited the cron line. Edit that line once yourself (e.g. change the minute) and commit, or run the workflow manually. Make sure the Claude GitHub App is installed on the repo. |
| Claude Code step fails with an authentication error | Re-run `claude setup-token` and update the `CLAUDE_CODE_OAUTH_TOKEN` secret. That day's reel still comes from the queue. |
| `gh pr create` fails with a permissions error | Step 2 above (allow Actions to create PRs). |
| Publish says "not approved" | The PR must be merged (not closed) and carry the `daily-reel` label. |
| Container status `ERROR` | Usually the video URL couldn't be fetched. See "About video URLs". |
| "hash mismatch" | The release files changed after approval. Re-run review for that reel (Daily reel → reel_id) and merge the new PR. |
| Scheduled workflows stopped | GitHub disables schedules after 60 days without repo activity; the daily commits normally prevent this. Re-enable in the Actions tab. |
