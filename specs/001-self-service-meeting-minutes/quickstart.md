# Quickstart Validation: Self-Service Meeting Minutes

## Local verification

1. Run `node scripts/verify-meeting-minutes.js` and require all schema, count, URL, and grouping checks to pass.
2. Run `npx @11ty/eleventy` and require a successful 16-page build.
3. Confirm `_site/about/index.html` contains all 13 labels exactly once.
4. Confirm all 13 built document paths exist and match their source hashes.

## Editor workflow verification

1. Open CloudCannon as the existing Content Editor role.
2. Confirm `Meeting Minutes` is visible and `Pages` remains hidden.
3. Open the 2026 record and verify all six fields and help text.
4. Create a temporary test record with an uploaded document, save, and verify the generated link.
5. Remove the temporary record and save; confirm only the intended migration files remain staged.

## Production verification

1. Record the current CloudCannon build ID and public labels.
2. Commit and push only the feature files.
3. Require a new CloudCannon build ID and matching remote HEAD.
4. Request `/about/` and all 13 linked documents; require HTTP 200 and non-trivial asset sizes.
5. Render `/about/` in a real browser, inspect browser errors, and capture the Meeting Minutes section.
