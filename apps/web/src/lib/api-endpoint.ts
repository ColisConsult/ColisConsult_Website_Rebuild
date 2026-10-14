import 'server-only';

/**
 * Adresse de l'API NestJS pour les appels faits par le serveur Next.js
 * (rendu des pages, back-office, server actions, routes).
 *
 * - Vercel : `API_SERVICE_URL` est injectée par la liaison (binding) déclarée dans
 *   vercel.json sur le service « web » vers le service « api ». Ne pas la définir à la
 *   main : Vercel la génère (URL interne, propre à chaque déploiement). Elle n'existe
 *   qu'à l'exécution, ni pendant le build, ni dans proxy.ts.
 * - Docker : `API_SERVICE_URL=http://api:4000` (docker-compose.yml).
 * - Local (`npm run dev`) : http://localhost:4000 par défaut.
 *
 * Pendant `next build`, aucune liaison n'existe : si `API_BUILD_URL` est définie (par
 * exemple l'adresse publique du site en production), les pages sont pré-rendues avec le
 * contenu réel ; sinon elles le sont à vide et se remplissent à la première visite.
 *
 * Toutes les routes de l'API portent le préfixe global /api (main.ts), aussi en interne.
 * `API_URL` (ancien réglage, préfixe /api compris) reste acceptée.
 */
function apiBase(): string {
  const building = process.env.NEXT_PHASE === 'phase-production-build';
  const service = (building && process.env.API_BUILD_URL) || process.env.API_SERVICE_URL;
  if (service) return new URL('api/', withSlash(service)).toString();
  if (process.env.API_URL) return withSlash(process.env.API_URL);
  return 'http://localhost:4000/api/';
}

function withSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

/** URL complète d'une route de l'API : apiEndpoint('/posts?page=1') */
export function apiEndpoint(path: string): string {
  return new URL(path.replace(/^\/+/, ''), apiBase()).toString();
}
