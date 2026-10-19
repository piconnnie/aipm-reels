#!/usr/bin/env bash
# Render → package → full QA → archive → upload preview assets to a GitHub
# pre-release. Used by the daily workflow and by the re-render-on-edit workflow.
#   scripts/daily/build-for-review.sh <reelId>
# Needs: GH_TOKEN, GITHUB_REPOSITORY. Run from ai-product-manager-content/.
set -euo pipefail
ID="$1"
node scripts/render-content.mjs "$ID"
node scripts/build-package.mjs "$ID"
node scripts/validate-content.mjs "$ID"
node scripts/daily/archive.mjs "$ID" --repo "$GITHUB_REPOSITORY"

TAG="reel-$ID"
cp "output/qa/$ID/contact-sheet.png" "output/qa/$ID/$ID-contact-sheet.png"
ASSETS=("output/reels/$ID.mp4" "output/covers/$ID.jpg" "output/qa/$ID/$ID-contact-sheet.png")
if gh release view "$TAG" > /dev/null 2>&1; then
  gh release upload "$TAG" "${ASSETS[@]}" --clobber
else
  gh release create "$TAG" "${ASSETS[@]}" --prerelease \
    --title "Reel $ID (awaiting review)" \
    --notes "Preview assets for review. Not posted yet. Approve by merging the review PR."
fi
