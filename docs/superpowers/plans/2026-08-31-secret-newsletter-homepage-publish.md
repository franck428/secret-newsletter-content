# TekDiscover Secret Newsletter Homepage Publish Plan

**Goal:** Replace the existing white Secret Newsletter conversion area on the TekDiscover homepage with the approved dark/neon-green design, showing exactly three current products and two locked member-only discoveries, without modifying unrelated PrestaShop content.

**Architecture:** Reuse the already-deployed `tekdiscover-homepage-worker.js`. That Worker injects `/recent-discoveries-loader.js` into the TekDiscover homepage and serves both the loader and `/recent-discoveries.html` directly from this repository's `main` branch with cache disabled. Extend the loader so it safely identifies the complete Secret Newsletter block by multiple unique text signatures, then replace only that block with the repository-hosted approved section. No PrestaShop credentials, DNS change, or Worker redeploy are required.

**Safety rules:**
- Never replace `body` or `html`.
- Require the hero headline, trial CTA, all four benefit headings, the Recent Discoveries heading, and at least five existing product links before replacing the origin block.
- Require a unique marker in the downloaded replacement HTML before insertion.
- On any fetch/target/markup error, leave the origin page untouched.

## Task 1 — Regression tests

Create a local static verification script first and confirm it fails before the new production files exist. It must verify the approved block has exactly 3 visible product cards, exactly 2 locked cards, the dark-theme marker, current product names/prices/URLs, subscription CTA, and no legacy products. It must also verify the loader has fail-safe target signatures and refuses body/html replacement.

## Task 2 — Publish approved replacement block

Update `recent-discoveries.html` so it contains the full approved Secret Newsletter homepage section (hero + benefits + 3 visible products + 2 locked products + trust row). Use the approved checkout URL and current product URLs/images. Keep all CSS scoped under `.td-subscribe` and responsive.

## Task 3 — Expand loader safely

Update `recent-discoveries-loader.js` to locate the complete existing Secret Newsletter conversion block by its unique signatures and replace it with the marked replacement section. Preserve fail-safe behavior: if the origin structure changes or the replacement is invalid, do nothing.

## Task 4 — Update publication documentation

Update `README.md` so future issues preserve the permanent 3-visible + 2-locked conversion strategy and explain that the loader now replaces the complete Secret Newsletter homepage section, not only the Recent Discoveries sub-block.

## Task 5 — Verify live delivery

Run the static regression suite after changes. Then confirm the public Worker paths deliver the new loader and replacement HTML, and check the TekDiscover homepage for the new section signatures. Do not claim completion unless the live delivery path is verified.