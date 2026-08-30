# Recent Discoveries Auto-Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically keep the TekDiscover homepage `RECENT DISCOVERIES IN OUR LATEST ISSUE` block synchronized with the five strongest products from every new Secret Newsletter edition.

**Architecture:** GitHub remains the source of truth. A generated `recent-discoveries.html` contains the five selected product cards; `recent-discoveries-loader.js` safely locates and replaces the existing homepage discoveries section; the existing Cloudflare Worker serves both assets and injects the loader only on TekDiscover homepage responses.

**Tech Stack:** Cloudflare Workers, JavaScript, HTMLRewriter, GitHub contents repository.

**Spec:** `docs/superpowers/specs/2026-08-30-recent-discoveries-auto-sync-design.md`

## Global Constraints

- Select exactly 5 products from each 10-product newsletter.
- Rank by wow factor, usefulness, price attractiveness, visual quality, live availability, and category diversity.
- Failure must leave the existing homepage block untouched.
- Never replace unrelated homepage content.
- Product links, images, names and prices must match the active newsletter.
- Dynamic assets must avoid stale caching.

---

### Task 1: Dynamic Recent Discoveries block

**Files:**
- Create: `recent-discoveries.html`
- Test: local source-contract test

**Interfaces:**
- Produces: a standalone `<section data-tekdiscover-recent-discoveries="true">` with exactly five product cards.

- [ ] Write a failing source-contract test asserting the file exists, contains exactly five cards, includes Anker Soundcore 2, and excludes AI Translation Earbuds.
- [ ] Run the test and verify failure because the file does not exist.
- [ ] Create the minimal five-card block using the current approved edition.
- [ ] Run the test and verify it passes.
- [ ] Commit the block.

### Task 2: Safe homepage loader

**Files:**
- Create: `recent-discoveries-loader.js`
- Test: local source-contract test

**Interfaces:**
- Consumes: `/recent-discoveries.html`.
- Produces: best-effort DOM replacement that leaves the page unchanged on any fetch or matching failure.

- [ ] Write a failing test asserting `fetch('/recent-discoveries.html')`, `cache: 'no-store'`, heading detection, `VIEW PRODUCT` confirmation, and fail-safe behavior.
- [ ] Run it and verify failure because the loader does not exist.
- [ ] Implement the loader with conservative target detection and no destructive fallback.
- [ ] Run tests and verify they pass.
- [ ] Commit the loader.

### Task 3: Cloudflare Worker routes and injection

**Files:**
- Modify: `cloudflare-worker.js`
- Test: local source-contract test

**Interfaces:**
- Serves: `/recent-discoveries.html`, `/recent-discoveries-loader.js`.
- Injects: loader script into HTML responses for `tekdiscover.com` and `www.tekdiscover.com` homepage requests only.

- [ ] Write a failing test against the current Worker source for the two new routes and hostname/homepage guards.
- [ ] Verify it fails on the current Worker.
- [ ] Add `serveText`, homepage origin pass-through, HTML script injection, and the two asset routes.
- [ ] Verify all source-contract tests pass.
- [ ] Commit the Worker change.

### Task 4: Publication workflow documentation

**Files:**
- Modify: `README.md`

- [ ] Document that every edition updates `public.html`, `partner.html`, `current.json`, and `recent-discoveries.html`.
- [ ] Document the five-product ranking rule.
- [ ] Verify the README references the new dynamic files.
- [ ] Commit documentation.

### Task 5: Deployment and live verification

- [ ] Deploy the updated Worker to the Cloudflare account/route controlling TekDiscover.
- [ ] Verify `/recent-discoveries.html` returns the current five-card block without stale cache.
- [ ] Open the TekDiscover homepage and verify exactly five cards are shown.
- [ ] Verify Anker Soundcore 2 is present and AI Translation Earbuds is absent.
- [ ] Verify each card image, price, and product link against the active newsletter.
