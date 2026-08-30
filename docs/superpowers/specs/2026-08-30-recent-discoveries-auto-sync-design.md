# Recent Discoveries Auto-Sync Design

## Goal
Make the TekDiscover homepage block `RECENT DISCOVERIES IN OUR LATEST ISSUE` update automatically whenever a new Secret Newsletter is published, with no webmaster or manual PrestaShop edit.

## Selection rule
For every newsletter edition, choose the 5 most interesting products among the 10 based on a combined editorial score: wow factor, usefulness, price attractiveness, visual quality, live availability, and category diversity.

## Architecture
The existing `secret-newsletter-content` GitHub repository remains the source of truth. Each publication updates `public.html`, `partner.html`, `current.json`, and a new `recent-discoveries.html` file. A lightweight browser loader (`recent-discoveries-loader.js`) fetches that block with `cache: no-store`, locates the homepage section by its stable heading plus the repeated `VIEW PRODUCT` controls, and replaces only that section.

The existing Cloudflare Worker gains routes for the new HTML block and loader. When the Worker is attached to the TekDiscover zone, homepage responses receive the loader script. All non-homepage TekDiscover requests pass through to the origin unchanged.

## Current selected products
1. Rimless Smart Glasses — $39.99
2. Funstorm 4K Mini Nanny Cam — $27.33
3. TP-Link Tapo D210 Video Doorbell — $30.00
4. Anker Soundcore 2 Portable Bluetooth Speaker — $27.00
5. Acer AI Face-Tracking Tripod — $21.90

## Safety and failure behavior
- If the dynamic block cannot be fetched, leave the existing homepage block untouched.
- If the target section cannot be identified confidently, leave the page untouched.
- Never replace unrelated homepage content.
- Product cards must use exact TekDiscover product URLs, image URLs, names and current newsletter prices.
- Cache-control for the dynamic block and loader must prevent stale editions.

## Publication workflow
For every new edition:
1. Produce and validate the 10-product newsletter.
2. Rank all 10 products using the editorial criteria.
3. Generate `recent-discoveries.html` from the top 5.
4. Update `public.html`, `partner.html`, `current.json`, and `recent-discoveries.html` together.
5. Verify the public newsletter and homepage block show the same edition and that all five card links/images are correct.
