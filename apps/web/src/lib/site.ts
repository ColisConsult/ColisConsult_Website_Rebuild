/** Coordonnées et liens externes du cabinet : à mettre à jour ici uniquement. */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  name: 'ColisConsult',
  phone: '01 48 98 18 68',
  phoneIntl: '+33 1 48 98 18 68',
  phoneHref: 'tel:+33148981868',
  email: 'commercial@colisconsult.com',
  address: {
    street: '53 avenue Carnot',
    postalCode: '94100',
    city: 'Saint-Maur-des-Fossés',
    country: 'France',
  },
  mapsUrl:
    'https://www.openstreetmap.org/search?query=53%20avenue%20Carnot%2C%2094100%20Saint-Maur-des-Foss%C3%A9s',
  calendly: 'https://calendly.com/matthieu-erly',
  linkedin: 'https://fr.linkedin.com/company/colisconsult',
  founderLinkedin: 'https://www.linkedin.com/in/matthieuerly/',
  youtube: 'https://www.youtube.com/channel/UCGT65FEjAkaDbJpbLOpejzQ',
  livestorm: 'https://app.livestorm.co/colisconsult',
  onePercent: 'https://www.onepercentfortheplanet.fr/',
  tarifColis: 'https://www.tarif-colis.com/',
} as const;

/** URL de l'API appelée depuis le navigateur (formulaires, simulateur) */
export const publicApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api').replace(
  /\/$/,
  '',
);
