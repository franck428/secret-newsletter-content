# Secret Newsletter Content

Ce dépôt est la source publique permanente de la dernière édition de The Secret Newsletter.

- `public.html` : version publique pour `/preview`
- `partner.html` : version Freelancer avec `{{AFFILIATE_URL}}`
- `kit.html` : kit Freelancer en ligne, guide ChatGPT et générateur personnalisé
- `current.json` : édition actuellement active
- `recent-discoveries.html` : bloc des 5 produits les plus intéressants de l'édition active
- `recent-discoveries-loader.js` : chargeur sécurisé qui remplace uniquement le bloc `RECENT DISCOVERIES IN OUR LATEST ISSUE`
- `tekdiscover-homepage-worker.js` : Worker dédié à la page d'accueil TekDiscover et aux deux fichiers Recent Discoveries
- `assets/issue-001/` : images publiques HTTPS
- `cloudflare-worker.js` : chargeur permanent de la newsletter et du kit Freelancer

## Workflow de publication

À chaque nouvelle édition, ChatGPT doit :

1. valider les 10 produits de la newsletter ;
2. sélectionner automatiquement les 5 produits les plus intéressants selon le wow factor, l'utilité, l'attractivité du prix, la qualité visuelle, la disponibilité et la diversité ;
3. remplacer `public.html` ;
4. remplacer `partner.html` ;
5. actualiser `current.json` ;
6. remplacer `recent-discoveries.html` avec les 5 produits sélectionnés ;
7. vérifier que les noms, images, prix et liens du bloc correspondent à l'édition active.

Une fois `tekdiscover-homepage-worker.js` déployé et routé une seule fois sur TekDiscover, les changements futurs de `recent-discoveries.html` sont lus depuis la branche `main` sans modification manuelle de PrestaShop.

Le Worker newsletter charge aussi `kit.html` depuis `main`, ce qui permet de mettre à jour le kit Freelancer sans nouveau déploiement Cloudflare.

La route Cloudflare `www.onefantasticshop.net/en/content/26-partner-program*` utilise le Worker newsletter pour remplacer uniquement l'ancien bloc Affiliate Starter Kit par `partner-program-starter-kit-block.html`, sans modifier le reste de la page PrestaShop.
