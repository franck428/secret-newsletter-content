# Secret Newsletter Content

Ce dépôt est la source publique permanente de la dernière édition de The Secret Newsletter.

- `public.html` : version publique pour `/preview`
- `partner.html` : version Freelancer avec `{{AFFILIATE_URL}}`
- `current.json` : édition actuellement active
- `assets/issue-001/` : images publiques HTTPS
- `cloudflare-worker.js` : chargeur permanent à installer une seule fois dans Cloudflare

À chaque nouvelle édition, ChatGPT remplace les deux fichiers HTML, actualise `current.json` et ajoute le nouveau dossier d’images. Cloudflare lit toujours la branche `main`.
