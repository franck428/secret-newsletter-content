# Secret Newsletter Content

Ce dépôt est la source publique permanente de la dernière édition de The Secret Newsletter.

- `public.html` : version publique pour `/preview`
- `partner.html` : version Freelancer avec `{{AFFILIATE_URL}}`
- `kit.html` : kit Freelancer en ligne, guide ChatGPT et générateur personnalisé
- `current.json` : édition actuellement active
- `recent-discoveries.html` : bloc complet Secret Newsletter de la page d'accueil TekDiscover, avec design conversion + 3 produits visibles + 2 découvertes verrouillées
- `recent-discoveries-loader.js` : chargeur sécurisé qui remplace uniquement le bloc complet Secret Newsletter de la page d'accueil après validation de signatures uniques
- `tekdiscover-homepage-worker.js` : Worker dédié à la page d'accueil TekDiscover et aux fichiers de remplacement
- `assets/issue-001/` : images publiques HTTPS
- `cloudflare-worker.js` : chargeur permanent de la newsletter et du kit Freelancer

## Workflow de publication

À chaque nouvelle édition, ChatGPT doit :

1. valider les 10 produits de la newsletter ;
2. sélectionner automatiquement 3 produits particulièrement attractifs pour être montrés publiquement selon le wow factor, l'utilité, l'attractivité du prix, la qualité visuelle, la disponibilité et la diversité ;
3. conserver 2 cartes verrouillées `MEMBERS ONLY` afin de créer de la curiosité et de conduire vers l'essai gratuit ;
4. remplacer `public.html` ;
5. remplacer `partner.html` ;
6. actualiser `current.json` ;
7. actualiser `recent-discoveries.html` avec le design Secret Newsletter approuvé, les 3 produits visibles de l'édition et 2 cartes verrouillées ;
8. vérifier que les noms, images, prix et liens des 3 produits correspondent à l'édition active et que les CTA verrouillés pointent vers l'abonnement.

Le positionnement permanent de ce bloc est : technologies utiles du quotidien, découvertes précoces, prix attractifs lorsqu'ils sont vérifiés, et accès membre aux découvertes non révélées. Ne jamais inventer un stock limité, une exclusivité ou une urgence.

Une fois `tekdiscover-homepage-worker.js` déployé et routé sur TekDiscover, les changements de `recent-discoveries.html` et `recent-discoveries-loader.js` sont lus depuis la branche `main` sans modification manuelle de PrestaShop ni nouveau déploiement Cloudflare. Le loader est fail-safe : si la structure de la page ne correspond plus aux signatures attendues, il laisse le contenu d'origine intact plutôt que de remplacer une mauvaise zone.

Le Worker newsletter charge aussi `kit.html` depuis `main`, ce qui permet de mettre à jour le kit Freelancer sans nouveau déploiement Cloudflare.

La route Cloudflare `www.onefantasticshop.net/en/content/26-partner-program*` utilise le Worker newsletter pour remplacer uniquement l'ancien bloc Affiliate Starter Kit par `partner-program-starter-kit-block.html`, sans modifier le reste de la page PrestaShop.
