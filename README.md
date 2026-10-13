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
| Photos de l'équipe | Déposez-les dans `apps/web/public/team/` puis renseignez `photo_url` (ex. `/team/matthieu-erly.jpg`) |
| URL françaises / anglaises | `apps/web/src/i18n/config.ts` |
| Redirections des anciennes URL | `apps/web/next.config.ts` |

## Intelligence artificielle : ce que dit le site

Le site présente trois usages, validés par l'équipe : **analyse des factures**, **pré-audit accéléré** et **analyse des offres d'appel d'offres**. Le parti pris éditorial : l'IA traite le volume, les consultants vérifient, négocient et décident. Aucune promesse chiffrée n'est attribuée à l'IA. L'illustration de facture de l'accueil est explicitement signalée comme exemple fictif.

## Avant la mise en ligne

- [ ] **Chiffres** : le site actuel affiche « 150 clients » et « 3 à 22 % » sur l'accueil, mais « 130 entreprises » et « 5 à 28 % » sur la page Clients. Le nouveau site reprend 150+ et 3–22 % : à confirmer.
- [ ] **Page IA** : relire les engagements sur les données (« utilisées uniquement pour votre mission », « suppression à tout moment »).
- [ ] **Simulateur** : calibrer les fourchettes par type de flux avec l'historique des missions (`simulator.config.ts`).
- [ ] **Témoignages** : seules des phrases reprises mot pour mot du site actuel ont été importées (les coupes sont signalées par « […] »). Compléter les textes intégraux dans le back-office si souhaité.
- [ ] **Mentions légales** : compléter les champs entre crochets (forme juridique, RCS, TVA, hébergeur, durée de conservation).
- [ ] **Photos de l'équipe** (des monogrammes s'affichent en attendant).
- [ ] **Traductions anglaises** : relecture par un natif.
- [ ] **Palmarès** : le formulaire crée une demande dans le back-office ; l'envoi du PDF reste manuel.
- [ ] Configurer le SMTP (`SMTP_*` dans `apps/api/.env`) pour recevoir les demandes par e-mail.

## Mise en production

Pile complète avec Docker (PostgreSQL + API + site) :

```bash
cp .env.example .env     # puis renseigner JWT_SECRET, ADMIN_PASSWORD et les URL publiques
docker compose up -d --build
docker compose exec api node dist/db/seed.js   # première fois : contenu initial + admin
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

À sauvegarder : le volume `pgdata` (base) et le volume `uploads` (factures déposées).

Bascule depuis WordPress : les anciennes URL (`/equipe/`, `/notre-mission/`, `/palmares/`, `/2023/06/08/mon-article/`…) sont redirigées en 301 vers les nouvelles. Lancez `npm run import:wordpress -- --download-images` **avant** de couper WordPress pour rapatrier articles et images.

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
- **Logo** : redessiné en vectoriel à partir du logo actuel (l'original PNG est dans `apps/web/public/brand/`).
