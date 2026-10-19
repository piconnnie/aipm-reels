# AIPM Reels

Daily Instagram reels for the **AI Product Manager** page.

Runs **completely free by default**: each morning the next pre-written draft comes from a content queue (no AI model at run time), Remotion renders it on free GitHub Actions minutes, automated QA checks copy, layout and the Instagram video spec, and a review PR opens with previews. **Merging the PR approves it**; it posts at the daily slot (default 19:00 IST) through Instagram's free API. When the queue runs low, an issue reminds you to ask Claude in chat for the next batch. Paid writers (Claude subscription or API) are opt-in via the `AIPM_WRITER` variable.

- **Control panel** (review, approve, schedule, pause — in the browser): [`control-panel/`](control-panel), published to GitHub Pages; see AUTOMATION.md → Control panel
- Setup and day-to-day use: [`ai-product-manager-content/AUTOMATION.md`](ai-product-manager-content/AUTOMATION.md)
- Content engine, brand system and QA gates: [`ai-product-manager-content/README.md`](ai-product-manager-content/README.md)
- Workflows: [`.github/workflows`](.github/workflows)
- Offline end-to-end test of the workflows: `ai-product-manager-content/scripts/test/harness/e2e.sh`
