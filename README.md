# ColisConsult — nouveau site

Refonte de colisconsult.com (WordPress) en application **Next.js + NestJS + PostgreSQL**, bilingue FR/EN, avec back-office.

```
colisconsult/
├── apps/
│   ├── web/   Next.js 16 (App Router, Cache Components) — site public + back-office /admin
│   └── api/   NestJS 12 + Drizzle ORM — contenus, formulaires, factures, simulateur, auth admin
├── docker-compose.yml   PostgreSQL (dev) ou pile complète (pré-prod)
└── scripts/dev.mjs      lance l'API et le site ensemble
```

## Ce que fait le site

| Côté visiteur | Côté équipe (back-office `/admin`) |
|---|---|
| Accueil, méthode, page IA, offres, clients, équipe, palmarès, blog, contact | Tableau de bord des demandes |
| **Pré-audit** avec dépôt de factures (PDF, Excel, CSV) | Fiche de chaque demande : statut, notes, téléchargement des factures, suppression RGPD |
| **Simulateur d'économies** (estimation calculée par l'API) | Articles du blog (Markdown, aperçu, brouillon/publié) |
| Version anglaise complète (`/en/...`) | Témoignages et webinars |
| Redirections 301 des anciennes URL WordPress | Le site public se met à jour dès l'enregistrement |

## Démarrer en local

**Prérequis** : Node.js 22 LTS (ou plus récent), **npm 11** (`npm install -g npm@11`) et Docker Desktop pour la base de données (ou un PostgreSQL 16 installé sur le poste).

```bash
# 1. Dépendances (à la racine du projet)
npm install

# 2. Variables d'environnement
#    Windows :  copy apps\api\.env.example apps\api\.env
#               copy apps\web\.env.example apps\web\.env.local
#    macOS/Linux : cp apps/api/.env.example apps/api/.env && cp apps/web/.env.example apps/web/.env.local
#    → dans apps/api/.env, changez au moins JWT_SECRET et ADMIN_PASSWORD

# 3. Base de données
npm run db:up          # démarre PostgreSQL dans Docker
npm run db:migrate     # crée les tables
npm run db:seed        # contenu initial + compte admin

# 4. Articles du blog actuel (recommandé)
npm run import:wordpress -- --download-images

# 5. Lancer
npm run dev
```

- Site : http://localhost:3000 (anglais : http://localhost:3000/en)
- Back-office : http://localhost:3000/admin — identifiants `ADMIN_EMAIL` / `ADMIN_PASSWORD` de `apps/api/.env`
- API : http://localhost:4000/api (santé : `/api/health`)

> Sans Docker : installez PostgreSQL 16, créez un utilisateur et une base `colisconsult`, et adaptez `DATABASE_URL` dans `apps/api/.env`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Les textes des pages (FR / EN) | `apps/web/src/i18n/dictionaries/fr.ts` et `en.ts` |
| Téléphone, e-mail, adresse, liens LinkedIn / YouTube / Calendly | `apps/web/src/lib/site.ts` |
| Couleurs, typographies | `apps/web/src/app/globals.css` (bloc `@theme`) |
| Les fourchettes du simulateur | `apps/api/src/simulator/simulator.config.ts` |
| Articles, témoignages, webinars | Back-office `/admin` |
| Équipe et liste des clients | Table `team_members` / `clients` (contenu initial : `apps/api/src/db/seed-data.ts`). `npm run db:studio` ouvre un éditeur de base de données. |
| Portraits de l'équipe | `apps/web/public/team/` (format 3:4, 900 × 1200 px) puis `photo_url` en base (ex. `/team/matthieu-erly.jpg`) |
| Photos des pages (conférence, bureau…) | `apps/web/src/assets/photos/` — importées dans les composants, optimisées automatiquement (AVIF/WebP, tailles adaptées) |
| Logos clients | `apps/web/src/assets/logos/` + la liste `apps/web/src/lib/client-logos.ts` (secteur, sélection de l'accueil) |
| Témoignages vidéo | `apps/web/public/videos/` + `apps/web/src/lib/videos.ts` (citation, fonction, durée) |
| URL françaises / anglaises | `apps/web/src/i18n/config.ts` |
| Redirections des anciennes URL | `apps/web/next.config.ts` |

## Intelligence artificielle : ce que dit le site

Le site présente trois usages, validés par l'équipe : **analyse des factures**, **pré-audit accéléré** et **analyse des offres d'appel d'offres**. Le parti pris éditorial : l'IA traite le volume, les consultants vérifient, négocient et décident. Aucune promesse chiffrée n'est attribuée à l'IA. L'exemple d'analyse (« 14,6 % des envois = 48,5 % de la dépense ») vient d'un audit client réel du support commercial 2024, présenté anonymisé.

## Partis pris de la v3 (design moderne et animé)

La v2 posait les contenus et les preuves ; la v3 les met en scène. Objectif inchangé : qu'un dirigeant de PME se dise en moins d'une minute « ce sont des experts, ils sont sérieux », avec un site qui fasse moderne et vivant.

- **Surfaces « nuit »** (pétrole très profond `#031C1E`) pour les temps forts : hero, IA, appel à l'action final, pied de page. Halos colorés animés, quadrillage discret, grain léger, lueur qui suit la souris.
- **Hero** : titre qui monte mot à mot, démonstration animée de l'analyse IA d'une facture (lignes lues, anomalies signalées, dépense répartie, validation par un expert), résultat client réel (−19 %, Airis LED), logos clients en défilement continu.
- **Défilement** : apparitions en cascade, chiffres qui défilent (résultats, rémunération, palmarès), étapes « collantes » avec barre de progression, phrase qui s'allume mot à mot, parallaxe douce sur les photos, défilement adouci à la molette (Lenis).
- **Micro-interactions** : en-tête flottant qui s'adapte au fond (clair/sombre) et se cache en descendant, barre de lecture, boutons « aimantés » avec reflet, cartes qui s'éclairent sous la souris, simulateur aux montants qui glissent vers leur nouvelle valeur, FAQ qui s'ouvre en douceur, menu mobile plein écran.
- **Honnêteté des contenus** : la console du hero est étiquetée « Démo » ; seules les barres 14,6 % / 48,5 % viennent d'un audit réel (anonymisé, source indiquée). Aucun chiffre inventé ; photos et logos réels uniquement, aucune image générée par IA.
- **Accessibilité et performance** : tout mouvement est coupé si l'utilisateur a demandé à réduire les animations (`prefers-reduced-motion`) ; le contenu reste visible sans JavaScript (filet de sécurité CSS) ; les lecteurs d'écran lisent les valeurs finales des compteurs. Accueil mesuré : LCP 0,45 s et CLS 0,007 sur ordinateur ; LCP 1,9 s en mobile bridé (4G lente, processeur ÷ 4).

### Ajouter une animation

Le moteur (`apps/web/src/components/motion/runtime.tsx`, JS natif, sans dépendance) lit des attributs posés dans les composants serveur :

| Attribut | Effet |
| --- | --- |
| `data-reveal` (`="fade"`, `"scale"`, `"left"`, `"right"`, `"blur"`) | apparition à l'entrée dans l'écran (`--d` pour un délai) |
| `data-stagger` | apparition en cascade des enfants directs |
| `class="seq"` + `data-bar` / `data-vbar` / `data-pop` / `data-line` | barres qui se remplissent, puces qui apparaissent, lignes qui glissent |
| `data-spotlight` (+ classe `spot`) | lueur qui suit la souris |
| `data-magnetic` | bouton attiré par la souris |
| `data-tilt` (+ classe `tilt`) | inclinaison 3D |
| `data-parallax="0.08"` | parallaxe (prop `parallax` du composant `Photo`) |
| `data-scrub` | mots qui s'allument au défilement (composant `ScrubText`) |
| `data-tone="dark"` | section sombre : l'en-tête passe en version claire au-dessus |

Composants : `CountUp` (chiffres), `RiseWords` (titres), `Marquee` (défilement), `Aurora` (halos), dans `components/motion/`.

## Avant la mise en ligne

- [ ] **Nombre de clients** : le site affiche « 150+ » (accueil du site actuel) ; le support 2024 et la page Clients actuelle disent « plus de 130 entreprises ». À trancher (`fr.ts`, `en.ts`).
- [ ] **Durée du partage des économies** : le site actuel indique 12 à 36 mois, le support 2024 « 12 ou 24 mois ». La v2 affiche **12 à 24 mois** (textes et simulateur, `simulator.config.ts`). À confirmer.
- [ ] **Logos clients** : 45 logos repris du dossier « 03_Logos/05_Clients » et du mur de logos. Vérifier que chaque client accepte d'être cité (et retirer ceux qui ne sont plus d'actualité dans `client-logos.ts`).
- [ ] **Témoignages** : extraits mot pour mot des recommandations LinkedIn et des vidéos (coupes signalées par « […] »). Les traductions sont signalées. Relire les fonctions (ex. Michael Benyamin, « Responsable commercial » selon le support 2024).
- [ ] **Exemple d'analyse anonymisé** (14,6 % / 48,5 %) : vérifier que le client concerné n'est pas identifiable.
- [ ] **Vidéos** : confirmer l'accord de diffusion sur le site (Melijoe, Lacoste, Wethenew).
- [ ] **Photo de Margaux Poiret** à ajouter (`public/team/margaux-poiret.jpg` + `photo_url`) ; un monogramme s'affiche en attendant.
- [ ] **Page IA** : relire les engagements sur les données (« utilisées uniquement pour votre mission », « suppression à tout moment »).
- [ ] **Simulateur** : calibrer les fourchettes par type de flux avec l'historique des missions (`simulator.config.ts`).
- [ ] **Mentions légales** : compléter les champs entre crochets (forme juridique, RCS, TVA, hébergeur, durée de conservation).
- [ ] **Traductions anglaises** : relecture par un natif.
- [ ] **Palmarès** : le formulaire crée une demande dans le back-office ; l'envoi du PDF reste manuel.
- [ ] Configurer le SMTP (`SMTP_*` dans `apps/api/.env`) pour recevoir les demandes par e-mail.

### Mettre à jour une base déjà remplie avec la v1

Le contenu initial (équipe avec photos, liste des clients, témoignages) a changé. Si vous aviez déjà lancé `npm run db:seed`, remplacez-le :

```bash
npm run db:seed -- --reset-content                                  # sans Docker
docker compose exec api node dist/db/seed.js --reset-content        # avec Docker
```

Attention : les témoignages modifiés depuis le back-office sont alors remplacés. Les articles, webinars et demandes ne sont pas touchés.

## Avec Docker (pile complète)

Les conteneurs contiennent une copie du code faite au moment du build : après chaque modification du code, il faut **reconstruire** les images.

```bash
docker compose up -d --build                                          # reconstruit et relance api + site
docker compose exec api node dist/db/seed.js --reset-content          # contenu initial (équipe, clients, témoignages)
docker compose exec api node dist/scripts/import-wordpress.js --download-images   # articles WordPress + images
```

- Si l'ancien site s'affiche encore : `docker compose build --no-cache api web` puis `docker compose up -d`, et rechargez la page sans cache (Ctrl+F5).
- Les images des articles sont copiées dans le volume Docker `media` et servies par le site sous `/media/blog/…`. L'import est relançable sans doublon.
- Le site rafraîchit son contenu chaque minute ; pour voir tout de suite un import : `docker compose restart web`.

## Mise en production

Pile complète avec Docker (PostgreSQL + API + site) :

```bash
cp .env.example .env     # puis renseigner JWT_SECRET, ADMIN_PASSWORD et les URL publiques
docker compose up -d --build
docker compose exec api node dist/db/seed.js   # première fois : contenu initial + admin
docker compose exec api node dist/scripts/import-wordpress.js --download-images   # articles + images du blog
```

Derrière un reverse proxy (Caddy, nginx…), sur un seul domaine :

- `https://www.colisconsult.com/api/*` → conteneur `api` (port 4000)
- tout le reste → conteneur `web` (port 3000)

avec `NEXT_PUBLIC_API_URL=https://www.colisconsult.com/api`, `NEXT_PUBLIC_SITE_URL=https://www.colisconsult.com` et `WEB_ORIGIN=https://www.colisconsult.com`.

Exemple Caddy :

```
www.colisconsult.com {
  handle /api/* {
    request_body { max_size 160MB }
    reverse_proxy localhost:4000
  }
  reverse_proxy localhost:3000
}
```

À sauvegarder : le volume `pgdata` (base), le volume `uploads` (factures déposées) et le volume `media` (images du blog).

Bascule depuis WordPress : les anciennes URL (`/equipe/`, `/notre-mission/`, `/palmares/`, `/2023/06/08/mon-article/`…) sont redirigées en 301 vers les nouvelles. Lancez `npm run import:wordpress -- --download-images` **avant** de couper WordPress pour rapatrier articles et images.

## Vitrine de démonstration sur Vercel (un projet, deux services)

Vercel sert à **montrer le site au client** (visuel, animations, parcours) ; le développement et la future production passent par Docker. `vercel.json` (racine du dépôt) déclare un seul projet Vercel avec deux [services](https://vercel.com/docs/services), construits séparément et servis sur le même domaine :

| Service | Dossier | Framework | Exposition publique |
| --- | --- | --- | --- |
| `api` | `apps/api` | NestJS | `/api/*` (formulaires et simulateur appelés par le navigateur) |
| `web` | `apps/web` | Next.js | tout le reste |

- **Routage** : les règles `rewrites` sont évaluées dans l'ordre, `/api/(.*)` d'abord. L'API reçoit le chemin complet (`/api/posts`), ce qui correspond à son préfixe global `api`.
- **Liaison (binding) `web` → `api`** : le serveur Next.js (pages, back-office, server actions) appelle l'API par le réseau interne de Vercel, à l'adresse que Vercel injecte dans `API_SERVICE_URL` à l'exécution. Ne pas définir cette variable soi-même ; elle n'existe ni pendant le build ni dans `proxy.ts` (qui n'appelle pas l'API). L'API n'appelle aucun autre service.
- **Navigateur** : les formulaires appellent `/api/...` sur le même domaine (pas de CORS) ; ne pas définir `NEXT_PUBLIC_API_URL` sur Vercel.
- **Pas d'indexation** : sur Vercel, `robots.txt` et l'en-tête `X-Robots-Tag` demandent aux moteurs de ne pas indexer la vitrine (elle reprend le contenu du site en ligne). `ALLOW_INDEXING=1` lève ce blocage.

### Mettre la vitrine en ligne

1. Importer le dépôt dans Vercel (« Add New… → Project ») : `vercel.json` suffit, sans réglage de dossier racine ni de framework.
2. Onglet **Storage** du projet : « Create Database » → **Neon** (offre gratuite) → la relier au projet. Vercel ajoute `DATABASE_URL` tout seul.
3. Onglet **Settings → Environment Variables** : ajouter `JWT_SECRET` (une longue suite de caractères au hasard) ; pour se connecter au back-office, `ADMIN_EMAIL` et `ADMIN_PASSWORD`. SMTP facultatif : sans `SMTP_HOST`, les demandes sont enregistrées sans e-mail.
4. Onglet **Deployments** : « Redeploy ». Pendant le déploiement, la base se prépare toute seule (`apps/api/src/scripts/vercel-prepare.ts`) : tables, import des articles WordPress (images servies par le WordPress actuel), équipe, clients, témoignages, compte admin. Rien à lancer depuis son poste.

Juste après un déploiement, les sections alimentées par la base (résultats, équipe, blog) peuvent mettre une minute à apparaître : recharger la page. Facultatif : `API_BUILD_URL` = adresse de la vitrine, pour qu'elles soient présentes dès le déploiement suivant.

Partager l'adresse de production du projet (`….vercel.app`) : les adresses de prévisualisation sont protégées par Vercel par défaut.

**Limites assumées de la vitrine** : pas de disque persistant ni de requêtes de plus de 4,5 Mo sur Vercel, donc le dépôt de factures au pré-audit et l'import d'images en local (`--download-images`) n'y fonctionnent pas. Tout le reste (pages, animations, simulateur, formulaires sans pièce jointe, back-office) fonctionne.

### En local

`vercel dev` lance les deux services ensemble et injecte la liaison (retirer alors `API_URL` et `NEXT_PUBLIC_API_URL` de `apps/web/.env.local`). `npm run dev` et Docker fonctionnent comme avant (`API_SERVICE_URL=http://api:4000` dans `docker-compose.yml`).

- **Compilation de l'API** : en déploiement, Vercel lance `npm run build` (`nest build`) et sert `dist/main.js`. NestJS a besoin des métadonnées de décorateurs que seul ce compilateur produit (injection de dépendances, validation des formulaires) ; c'est pourquoi le service `api` déclare `devCommand: npm run start:dev`, pour que `vercel dev` utilise le même compilateur.
- **Vérifié** : `vercel build` (les deux services) et `vercel dev` en local ; pages, formulaires, simulateur et back-office (connexion, téléchargement de facture, modification d'articles) passent par le routage et la liaison.

## Commandes utiles

| Commande | Effet |
|---|---|
| `npm run dev` | API + site en mode développement |
| `npm run build` | Build de production des deux applications |
| `npm run db:migrate` / `db:seed` | Migrations / contenu initial |
| `npm run db:generate -w api` | Génère une migration après modification de `apps/api/src/db/schema.ts` |
| `npm run db:studio -w api` | Éditeur visuel de la base |
| `npm run import:wordpress` | (Ré)importe les articles WordPress, sans doublon |
| `npm test -w api` | Tests unitaires de l'API |
| `npm run lint -w web` | Vérification du code du site |

## Choix techniques

- **Rendu** : pages pré-rendues et mises en cache (`use cache`), contenu rafraîchi chaque minute et immédiatement après une modification dans le back-office (`updateTag`).
- **URL** : français sans préfixe (`/equipe`), anglais sous `/en` avec des slugs anglais (`/en/team`). Balises `hreflang`, sitemap et données structurées incluses.
- **Confidentialité** : polices hébergées localement (pas d'appel à Google Fonts), aucun traceur tiers, factures stockées hors du dossier public et téléchargeables uniquement par l'équipe connectée.
- **Sécurité** : limitation du débit sur les formulaires et la connexion, champ anti-spam, contrôle du type et de la taille des fichiers, session admin en cookie `httpOnly`.
- **Logo** : tracés officiels du logo 2021 (« Logo-H1 », « Logomark »), intégrés en SVG pour la déclinaison blanche ; fichier téléchargeable dans `apps/web/public/brand/colisconsult-logo.svg`.
- **Animations** : moteur maison en JS natif (quelques Ko, sans dépendance) piloté par attributs `data-*`, Lenis pour le défilement adouci ; les composants restent des composants serveur, le moteur démarre une fois la page hydratée (aucun écart d'hydratation).
- **Images et vidéos** : photos redimensionnées (2000 px max) puis servies en AVIF/WebP par Next.js ; vidéos réencodées en 720p H.264 (4 à 6 Mo chacune), chargées seulement au clic, sans lecteur tiers.
