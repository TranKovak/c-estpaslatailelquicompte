# 🍞 C'est pas la taille qui compte (CPLQ)

Calculateur de recettes de boulangerie en **pourcentages boulangers** — PWA 100% offline, pensée pour être utilisée en cuisine sur mobile.

## C'est quoi le pourcentage boulanger ?

En boulangerie professionnelle, chaque ingrédient est exprimé en pourcentage **par rapport au poids de farine** (toujours 100%). Ça permet de scaler n'importe quelle recette instantanément, quelle que soit la quantité voulue.

**Exemple :**
| Ingrédient | % boulanger | Pour 300 g de farine |
|---|---|---|
| Farine | 100% | 300 g |
| Eau | 68% | 204 g |
| Sel | 2% | 6 g |
| Levain | 20% | 60 g |

## Fonctionnalités

- **Calculateur bidirectionnel** — entrez le poids de pain voulu *ou* la farine disponible, les quantités s'ajustent automatiquement
- **Taux d'évaporation** — pris en compte dans le calcul du poids final
- **Mode essai** — modifiez les proportions en temps réel sans toucher à la recette originale
- **Mode pas-à-pas** — guidage étape par étape avec Wake Lock (l'écran reste allumé)
- **Historique des fournées** — sauvegardez vos résultats avec notes et photo
- **Partage par QR code** — exportez/importez une recette en un scan
- **Import/export JSON** — sauvegardez toute votre bibliothèque
- **4 langues** — Français, English, Español, Quenya 🧝

## Stack technique

- [SvelteKit](https://kit.svelte.dev/) en mode SPA (adapter-static, ssr=false)
- [IndexedDB](https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API) via [idb](https://github.com/jakearchibald/idb) — stockage local 100% offline
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — Service Worker, installation sur l'écran d'accueil
- [svelte-i18n](https://github.com/kaisermann/svelte-i18n) — internationalisation
- [jsQR](https://github.com/cozmo/jsQR) + [qrcode](https://github.com/soldair/node-qrcode) — scan et génération de QR codes
- Déployé sur **GitHub Pages** via GitHub Actions

## Développement

```bash
npm install
npm run dev          # serveur local
npm run dev -- --host  # exposé sur le réseau local (test mobile)
npm run build        # build de production
npm run test         # tests unitaires (Vitest)
```

> **HTTPS requis** pour la caméra (import QR code) et le Wake Lock.
> Utiliser [ngrok](https://ngrok.com/) pour tester ces fonctionnalités sur mobile en local :
> ```bash
> npm run preview -- --host
> npx ngrok http 4173
> ```

## Déploiement

Le déploiement est automatique via GitHub Actions à chaque push sur `main`.

Pour bumper la version :
```bash
npm version patch   # 1.2.3 → 1.2.4
npm version minor   # 1.2.3 → 1.3.0
npm version major   # 1.2.3 → 2.0.0
git push origin main --follow-tags
```

## Données & vie privée

Toutes les données (recettes, historique, photos) sont stockées **uniquement sur votre appareil** via IndexedDB. Aucune donnée n'est envoyée sur un serveur.
