# Secret Newsletter Content

Ce dépôt est la source publique permanente de la dernière édition de The Secret Newsletter.

- `public.html` : version publique pour `/preview`
- `partner.html` : version Freelancer avec `{{AFFILIATE_URL}}`
- `kit.html` : kit Freelancer en ligne, guide ChatGPT et générateur personnalisé
- `current.json` : édition actuellement active
- `assets/issue-001/` : images publiques HTTPS
- `cloudflare-worker.js` : chargeur permanent à installer une seule fois dans Cloudflare

À chaque nouvelle édition, ChatGPT remplace les deux fichiers HTML, actualise `current.json` et ajoute le nouveau dossier d’images. Cloudflare lit toujours la branche `main`.

Le Worker charge aussi `kit.html` depuis `main`, ce qui permet de mettre à jour le kit Freelancer sans nouveau déploiement Cloudflare.
