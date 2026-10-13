import path from 'node:path';
import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  output: 'standalone',
  // Monorepo : trace les dépendances depuis la racine (node_modules partagé)
  outputFileTracingRoot: path.resolve(process.cwd(), '../..'),
  poweredByHeader: false,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  /**
   * Redirections 301 depuis les URL de l'ancien site WordPress, pour conserver
   * le référencement. Les nouvelles URL françaises reprennent les anciens slugs
   * quand la page existe toujours (/equipe, /notre-mission, /palmares…).
   */
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/a-propos', destination: '/equipe', permanent: true },
      { source: '/nos-solutions', destination: '/nos-offres', permanent: true },
      { source: '/nos-tarifs', destination: '/nos-offres', permanent: true },
      { source: '/tarifs-rendez-vous-expert', destination: '/contact', permanent: true },
      { source: '/dashboard-powerbi', destination: '/nos-offres#dashboard-power-bi', permanent: true },
      { source: '/blog-acheteur-transport', destination: '/blog', permanent: true },
      { source: '/blog-acheteur-transport/page/:n', destination: '/blog', permanent: true },
      // Articles : /2023/06/08/mon-article/ → /blog/mon-article
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/wp-admin/:path*', destination: '/admin', permanent: false },
    ];
  },
};

export default nextConfig;
