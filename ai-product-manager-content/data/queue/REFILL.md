# Refilling the content queue

The daily pipeline posts one pre-written draft from this folder per day, with no AI model at run time. A weekly scheduled Claude task (or you, in a chat) keeps the folder topped up to about three weeks of drafts. This file is the brief for that job.

## Steps

1. From `ai-product-manager-content/`, run `node scripts/daily/refill-plan.mjs`. It prints how many drafts to write (`write N`), the next draft number, which pillars to favour, which formats are already queued, and the unclaimed backlog topics. If it says `write 0`, stop: nothing to do.
2. If it asks for new topics, first add that many to `data/topics/backlog.json` (next free `tNNN` id, `"status": "open"`, a pillar letter A–F, a format id from `src/templates/formats.json`, a `topic` and a specific `angle`). Topics must teach a durable, practical lesson for people who build AI products, and must not repeat an existing topic or a recent hook.
3. Write N drafts as `data/queue/qNNN-<short-slug>.json`, numbered from the number the planner gives. Pick unclaimed topics, favouring the pillars it lists, and spread formats so no format repeats on consecutive days.
4. Validate each draft. From `ai-product-manager-content/`: `rm -f output/daily/plan.json; node scripts/daily/finalize-draft.mjs data/queue/<file>.json --check --source queue`. It must print `OK —`. Fix and re-check until it does; drop any draft you can't fix.
5. Commit only `data/queue/*.json` (and `data/topics/backlog.json` if you added topics) to `main` with a message like `queue: add q015–q024 (scheduled refill)`, then push. If the push is rejected, `git pull --rebase` and push again.

## What a draft looks like

Copy the structure of the existing drafts exactly; `q005`–`q014` cover every scene type: hook, cards (pop and flip), checklist, diagram, table, terminal, comparison, takeaway. Required: `brief` (with `backlogId`, `pillar` like `"B: GenAI Product Delivery"`, `format`, `objective`, `technicalDepth`, `voiceover: false`, `research`), `coreInsight`, three scored `hooks` with `selectedHook` and `selectionRationale`, `scenes` (hook first, takeaway last), `cover`, `caption` (opening, body, cta, 3–8 hashtags), `primaryCta` matching the takeaway's `cta`, `claims`, `publish`, `repurposing`. Leave out `id`, `fps`, `audio` and `style`; the pipeline sets those (style rotates theme, music and motion automatically).

## Quality bar

- The hook is readable on frame 0, specific, and makes a promise the reel keeps. No clickbait words ("game-changer", "mind-blowing", "secret", "10x"…).
- One idea per reel. A practitioner should be able to act on it today.
- Copy fits the layout limits (the validator enforces them). Short lines win.
- Claims: label opinions as `practitioner-opinion`. Any number that isn't a sourced fact is `illustrative` and must say "illustrative" on screen and in the caption. A `verified-fact` needs a real source URL you opened, with an `accessed` date. When in doubt, don't state it as fact.
- Vary the angle, format and opening across the batch. Don't reuse a hook pattern from the last 20 reels or drafts.

## Never

- Never edit other files, workflows or settings; merge or close PRs; post anything; or touch secrets.
