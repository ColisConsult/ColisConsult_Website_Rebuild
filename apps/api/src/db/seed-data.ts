/**
 * Contenu initial repris du site WordPress (colisconsult.com, octobre 2026).
 *
 * ⚠ Témoignages : seules des phrases reprises mot pour mot du site actuel sont utilisées.
 *   Les « […] » signalent une coupe. Complétez les textes intégraux depuis le back-office
 *   (/admin/temoignages) si vous le souhaitez. Les versions anglaises sont des traductions,
 *   signalées comme telles sur le site.
 */
type Segment = 'enterprise' | 'ecommerce' | 'sme';

export const teamSeed = [
  {
    name: 'Matthieu Erly',
    roleFr: 'Directeur et fondateur',
    roleEn: 'Founder & Managing Director',
    bioFr:
      "Passé par les services commerciaux de plusieurs transporteurs, il fonde ColisConsult en 2005. Il pilote les missions et reste l'interlocuteur direct des clients. Intervenant régulier en conférences, il anime une communauté de plus de 15 000 abonnés sur LinkedIn et les groupes « Acheteur transport » et « DHL Express, FedEx-TNT, UPS in Europe ».",
    bioEn:
      'After working in the sales departments of several carriers, he founded ColisConsult in 2005. He leads every engagement and remains the client’s direct contact. A regular conference speaker, he runs a LinkedIn community of more than 15,000 followers and the groups “Acheteur transport” and “DHL Express, FedEx-TNT, UPS in Europe”.',
    linkedinUrl: null,
    sortOrder: 1,
  },
  {
    name: 'Stéphane Gravier',
    roleFr: 'Directeur de projet',
    roleEn: 'Project Director',
    bioFr:
      'Accompagne Matthieu Erly et Majdi Hammami à chaque étape des missions, du cadrage à la sélection des offres.',
    bioEn:
      'Works alongside Matthieu Erly and Majdi Hammami at every stage of an engagement, from scoping to carrier selection.',
    linkedinUrl: null,
    sortOrder: 2,
  },
  {
    name: 'Majdi Hammami',
    roleFr: 'Consultant transport senior',
    roleEn: 'Senior Transport Consultant',
    bioFr:
      "Responsable de l'ensemble des analyses des missions : factures, flux, grilles tarifaires et réponses des transporteurs.",
    bioEn:
      'Leads all engagement analysis: invoices, shipping flows, rate cards and carrier responses.',
    linkedinUrl: null,
    sortOrder: 3,
  },
  {
    name: 'Mohamed Farsi',
    roleFr: 'Transport Data Analyst',
    roleEn: 'Transport Data Analyst',
    bioFr:
      'Traite et fiabilise les données de facturation transport qui alimentent les analyses et les tableaux de bord.',
    bioEn:
      'Processes and cleans the transport billing data behind every analysis and dashboard.',
    linkedinUrl: null,
    sortOrder: 4,
  },
  {
    name: 'Margaux Poiret',
    roleFr: 'Communication & digital',
    roleEn: 'Communications & Digital',
    bioFr:
      'Gère les sites web, la communication, le marketing et l’organisation des événements, dont les webinars.',
    bioEn:
      'Runs the websites, communications, marketing and events, including our webinars.',
    linkedinUrl: null,
    sortOrder: 5,
  },
  {
    name: 'Maxime Courbeyrette',
    roleFr: 'Alternant',
    roleEn: 'Apprentice',
    bioFr: '',
    bioEn: '',
    linkedinUrl: null,
    sortOrder: 6,
  },
];

const clientNames: Record<Segment, string[]> = {
  enterprise: [
    'Danone',
    'Somfy',
    'Ubisoft',
    'Decathlon Pro',
    'Plastic Omnium',
    'Firmenich',
    'Arkema',
    'Atlas Copco',
    'Beiersdorf',
    'Estée Lauder',
    'Nutricia',
    'Biogen',
    'UCB',
    'Arkopharma',
    'Recordati Rare Diseases',
    'Life Technologies',
    'ADP',
    'Regus',
    'CNP',
  ],
  ecommerce: [
    'Lacoste',
    'Patagonia',
    'Vestiaire Collective',
    'Nina Ricci',
    'Paco Rabanne',
    'Courir',
    'Bioderma',
    'RAJA',
    'Carven',
    'Dakine',
    'Woodbrass',
    'Melijoe',
    'Philibert',
    'WeTheNew',
    'Emma Sleep',
    'Balzac Paris',
    'Anne Semonin',
    'Therascience',
    'Packshop',
    'Airis LED',
    'Cheval Energy',
  ],
  sme: [
    'Guard Industrie',
    'Alma',
    'Eugène Perma',
    'Alliance Artem',
    'Let Me Repair',
    'Nowos',
    'Cetofine',
  ],
};

export const clientsSeed = (Object.keys(clientNames) as Segment[]).flatMap(
  (segment) =>
    clientNames[segment].map((name, i) => ({ name, segment, sortOrder: i })),
);

export const testimonialsSeed: {
  company: string;
  author: string;
  role: string;
  missionFr: string;
  missionEn: string;
  quoteFr: string;
  quoteEn: string;
  quoteLang?: 'fr' | 'en';
  resultFr?: string;
  resultEn?: string;
  segment: Segment;
  featured?: boolean;
  sortOrder: number;
}[] = [
  {
    company: 'Somfy',
    author: 'Virginie Tueta',
    role: 'Group Indirect Purchasing Manager',
    missionFr: 'Appel d’offres colis EMEA',
    missionEn: 'EMEA parcel tender',
    quoteFr:
      'Matthieu et son équipe ont géré avec succès notre appel d’offres colis EMEA fin 2020. […] Je recommande vivement ses services pour tout projet d’appel d’offres de colis.',
    quoteEn:
      'Matthieu and his team successfully ran our EMEA parcel tender at the end of 2020. […] I highly recommend his services for any parcel tender project.',
    segment: 'enterprise',
    featured: true,
    sortOrder: 1,
  },
  {
    company: 'Vestiaire Collective',
    author: 'Christian Jorge',
    role: 'Co-founder & former VP Ops',
    missionFr: 'Reprise générale du plan de transport',
    missionEn: 'Full overhaul of the transport plan',
    quoteFr:
      'Notre choix s’est porté sur ColisConsult. Notre dossier a été supervisé par Matthieu. […] Matthieu est un partenaire à l’écoute, souple, réactif et fiable.',
    quoteEn:
      'We chose ColisConsult. Our project was overseen by Matthieu. […] Matthieu is an attentive, flexible, responsive and reliable partner.',
    resultFr: 'Plusieurs milliers de colis par jour vers 45 pays',
    resultEn: 'Thousands of parcels a day to 45 countries',
    segment: 'ecommerce',
    featured: true,
    sortOrder: 2,
  },
  {
    company: 'Firmenich',
    author: 'Rémi Forgeot',
    role: 'Directeur financier',
    missionFr: 'Express international',
    missionEn: 'International express delivery',
    quoteFr: 'Je peux dire que les résultats ont été supérieurs à nos attentes.',
    quoteEn: 'I can say that the results were higher than expected.',
    quoteLang: 'en',
    segment: 'enterprise',
    featured: true,
    sortOrder: 3,
  },
  {
    company: 'Guard Industrie',
    author: 'Barnabé Wayser',
    role: 'Président',
    missionFr: 'Appels d’offres transport',
    missionEn: 'Transport tenders',
    quoteFr: 'Équipe très compétente, dynamique et en plus très sympathique.',
    quoteEn: 'A very competent, dynamic and genuinely friendly team.',
    segment: 'sme',
    featured: true,
    sortOrder: 4,
  },
  {
    company: 'Airis LED',
    author: 'Michael Benyamin',
    role: 'Marketing',
    missionFr: 'Optimisation des contrats colis et palettes',
    missionEn: 'Parcel and pallet contract optimisation',
    quoteFr:
      'ColisConsult a optimisé nos contrats de transport de colis et de palettes, principalement en France.',
    quoteEn:
      'ColisConsult optimised our parcel and pallet contracts, mainly in France.',
    resultFr: '−19 % sans changer de transporteur',
    resultEn: '−19% without changing carrier',
    segment: 'ecommerce',
    featured: true,
    sortOrder: 5,
  },
  {
    company: 'Plastic Omnium',
    author: 'Nicole Hemard',
    role: 'Purchaser',
    missionFr: 'Étude et appel d’offres transport express',
    missionEn: 'Express transport study and tender',
    quoteFr:
      'Matthieu a réalisé une étude précise de notre activité « transport express ».',
    quoteEn:
      'Matthieu carried out a precise study of our express transport activity.',
    resultFr: 'Gains de 25 % et 39 %',
    resultEn: '25% and 39% savings',
    segment: 'enterprise',
    featured: true,
    sortOrder: 6,
  },
  {
    company: 'Danone',
    author: 'Bruno Peloin',
    role: 'Directeur Supply Chain, Danone Advanced Medical Nutrition (Nutricia)',
    missionFr: 'Appel d’offres transport',
    missionEn: 'Transport tender',
    quoteFr:
      'Matthieu a conduit avec brio, pour le compte de Danone, un appel d’offres en 2018.',
    quoteEn: 'Matthieu brilliantly ran a tender for Danone in 2018.',
    segment: 'enterprise',
    sortOrder: 7,
  },
  {
    company: 'Nutricia',
    author: 'Rebecca de Klerck',
    role: 'Facility Manager, Nutricia Research & Nutricia Nederland',
    missionFr: 'Appel d’offres messagerie et colis, entités Benelux',
    missionEn: 'Groupage and parcel tender, Benelux entities',
    quoteFr: 'Ce fut un réel plaisir de travailler avec Matthieu !',
    quoteEn: 'It was a real pleasure to work with Matthieu!',
    segment: 'enterprise',
    sortOrder: 8,
  },
  {
    company: 'Decathlon Pro',
    author: 'Guillaume Allard',
    role: 'Responsable des opérations',
    missionFr: 'Appel d’offres affrètement',
    missionEn: 'Freight chartering tender',
    quoteFr:
      'Matthieu et toute son équipe nous ont aidés lors d’un appel d’offres affrètement pour Decathlon Pro.',
    quoteEn:
      'Matthieu and his whole team helped us with a freight chartering tender for Decathlon Pro.',
    segment: 'enterprise',
    sortOrder: 9,
  },
  {
    company: 'Nina Ricci',
    author: 'Hakima Desch-Benhemadi',
    role: 'Logistics & Customer Service Manager',
    missionFr: 'Maîtrise des coûts de transport express',
    missionEn: 'Express transport cost control',
    quoteFr:
      'ColisConsult nous a permis de bénéficier de solutions de transport plus adaptées.',
    quoteEn: 'ColisConsult gave us access to better-suited transport solutions.',
    segment: 'ecommerce',
    sortOrder: 10,
  },
  {
    company: 'RAJA',
    author: 'Mathieu Dubalais',
    role: 'Directeur Transport France',
    missionFr: 'Appel d’offres transport pour les entités du groupe',
    missionEn: 'Transport tender for the group’s entities',
    quoteFr:
      'Matthieu et ses équipes ont assisté le groupe RAJA pour un appel d’offres de transport.',
    quoteEn: 'Matthieu and his teams supported the RAJA group on a transport tender.',
    resultFr: '1,2 million de colis par an',
    resultEn: '1.2 million parcels a year',
    segment: 'ecommerce',
    sortOrder: 11,
  },
  {
    company: 'Patagonia',
    author: 'Sylvain Morvan',
    role: 'IT & Logistics Director',
    missionFr: 'Optimisation des flux de transport en Europe',
    missionEn: 'European transport flow optimisation',
    quoteFr:
      'J’ai pu apprécier le professionnalisme et les méthodes d’optimisation des flux de transport dans un contexte européen.',
    quoteEn:
      'I appreciated the professionalism and the transport flow optimisation methods in a European context.',
    segment: 'ecommerce',
    sortOrder: 12,
  },
  {
    company: 'Laboratoire Bioderma',
    author: 'Emilie Toledano',
    role: 'Responsable Supply Chain',
    missionFr: 'Optimisation des transports',
    missionEn: 'Transport optimisation',
    quoteFr:
      'J’ai collaboré avec Matthieu dans le cadre d’une mission d’optimisation de nos transports.',
    quoteEn: 'I worked with Matthieu on a project to optimise our transport.',
    segment: 'ecommerce',
    sortOrder: 13,
  },
  {
    company: 'Balzac Paris',
    author: 'Alexandre Chevalier',
    role: 'Responsable Supply Chain',
    missionFr: 'Remise à plat du plan de distribution e-commerce',
    missionEn: 'E-commerce distribution plan overhaul',
    quoteFr:
      'Matthieu nous a accompagnés dans notre stratégie de remise à plat de notre plan de distribution e-com.',
    quoteEn:
      'Matthieu supported us in overhauling our e-commerce distribution plan.',
    segment: 'ecommerce',
    sortOrder: 14,
  },
  {
    company: 'Anne Semonin',
    author: 'Amaury de Loisy',
    role: 'General Manager',
    missionFr: 'Optimisation des transports B2B et B2C',
    missionEn: 'B2B and B2C transport optimisation',
    quoteFr:
      'Matthieu nous a aidés à optimiser nos activités de transport B2B et B2C.',
    quoteEn: 'Matthieu helped us optimise our B2B and B2C transport.',
    segment: 'ecommerce',
    sortOrder: 15,
  },
  {
    company: 'Alma',
    author: 'Nathalie Moine',
    role: 'Responsable des achats',
    missionFr: 'Appel d’offres messagerie et palettes',
    missionEn: 'Groupage and pallet tender',
    quoteFr:
      'Nous avons confié à ColisConsult la gestion d’un appel d’offres transport messagerie palettes.',
    quoteEn: 'We entrusted ColisConsult with running a pallet groupage tender.',
    segment: 'sme',
    sortOrder: 16,
  },
  {
    company: 'Eugène Perma',
    author: 'Manuel Servio',
    role: 'Logistics Director',
    missionFr: 'Analyse et benchmark des flux de livraison',
    missionEn: 'Delivery flow analysis and benchmark',
    quoteFr:
      'Matthieu et son équipe ont effectué une analyse et un benchmark poussé de nos flux.',
    quoteEn:
      'Matthieu and his team carried out an in-depth analysis and benchmark of our flows.',
    segment: 'sme',
    sortOrder: 17,
  },
  {
    company: 'Life Technologies (Thermo Fisher)',
    author: 'Bruno Baudoin',
    role: 'Integration Project Management, Commercial Operations EMEA',
    missionFr: 'Renégociation des contrats DHL et TNT',
    missionEn: 'DHL and TNT contract renegotiation',
    quoteFr:
      '[…] une mission de renégociation de nos contrats de transport avec DHL & TNT.',
    quoteEn: '[…] a project to renegotiate our transport contracts with DHL & TNT.',
    resultFr: 'Meilleurs tarifs, mêmes transporteurs',
    resultEn: 'Better rates, same carriers',
    segment: 'enterprise',
    sortOrder: 18,
  },
];

/**
 * Articles du blog WordPress (1re page). Le contenu complet s'importe avec
 * `npm run import:wordpress`, qui met à jour ces entrées par slug.
 */
export const postsSeed = [
  {
    slug: 'recueils-des-recommandations-linkedin-deposees-par-les-clients-colisconsult',
    title: 'Recueil des recommandations LinkedIn déposées par les clients ColisConsult',
    excerpt:
      'Les recommandations laissées par nos clients, également visibles sur le profil LinkedIn de Matthieu Erly.',
    publishedAt: '2026-06-15T16:24:31+02:00',
    legacyUrl:
      '/2026/06/15/recueils-des-recommandations-linkedin-deposees-par-les-clients-colisconsult/',
  },
  {
    slug: 'webinar-un-ao-pour-contrer-les-hausses-2026-des-transporteurs-bonne-ou-mauvaise-idee',
    title:
      '[Webinar] Un AO pour contrer les hausses 2026 des transporteurs : bonne ou mauvaise idée ?',
    excerpt:
      'Webinar réservé aux entreprises expéditrices, sur le lancement d’un appel d’offres face aux hausses tarifaires 2026.',
    publishedAt: '2025-11-21T12:59:15+01:00',
    legacyUrl:
      '/2025/11/21/webinar-un-ao-pour-contrer-les-hausses-2026-des-transporteurs-bonne-ou-mauvaise-idee/',
  },
  {
    slug: 'les-enjeux-de-la-gestion-des-expeditions-pour-les-e-commercants',
    title: 'Les enjeux de la gestion des expéditions pour les e-commerçants',
    excerpt:
      'La gestion des expéditions, pilier de la stratégie commerciale des e-commerçants. Une tribune de CibleWeb.',
    publishedAt: '2024-03-05T10:00:00+01:00',
    legacyUrl: '/2024/03/05/les-enjeux-de-la-gestion-des-expeditions-pour-les-e-commercants/',
  },
  {
    slug: 'guide-2023-reussir-lenvoi-de-colis-en-toute-simplicite',
    title: 'Guide : réussir l’envoi de colis en toute simplicité',
    excerpt:
      'Emballage, choix du service, assurance : les bases pour expédier des colis sans mauvaise surprise, à titre personnel comme professionnel.',
    publishedAt: '2023-07-27T10:00:00+02:00',
    legacyUrl: '/2023/07/27/guide-2023-reussir-lenvoi-de-colis-en-toute-simplicite/',
  },
  {
    slug: 'pourquoi-vous-devriez-lancer-un-ao-transport-cet-ete',
    title: 'Pourquoi lancer un appel d’offres transport cet été ?',
    excerpt:
      'Anticiper les hausses tarifaires annuelles des transporteurs en lançant son appel d’offres dès l’été.',
    publishedAt: '2023-06-29T10:00:00+02:00',
    legacyUrl: '/2023/06/29/pourquoi-vous-devriez-lancer-un-ao-transport-cet-ete/',
  },
  {
    slug: '4-leviers-efficaces-pour-reduire-votre-budget-de-transport-express',
    title: '4 leviers efficaces pour réduire votre budget de transport express',
    excerpt:
      'Quatre leviers concrets pour faire baisser nettement votre budget de transport express.',
    publishedAt: '2023-06-09T10:00:00+02:00',
    legacyUrl: '/2023/06/09/4-leviers-efficaces-pour-reduire-votre-budget-de-transport-express/',
  },
  {
    slug: '13-erreurs-a-eviter-pour-vos-envois-de-colis',
    title: '13 erreurs à éviter pour vos envois de colis',
    excerpt:
      'Les erreurs les plus fréquentes dans l’expédition de colis, et comment les corriger.',
    publishedAt: '2023-06-08T10:00:00+02:00',
    legacyUrl: '/2023/06/08/13-erreurs-a-eviter-pour-vos-envois-de-colis/',
  },
  {
    slug: 'le-poids-volumetrique-dans-le-transport-comment-optimiser-votre-budget-et-reduire-limpact-economique',
    title: 'Le poids volumétrique : comment optimiser votre budget transport',
    excerpt:
      'Le poids volumétrique pèse de plus en plus dans la tarification. Comment le mesurer, et comment limiter son impact.',
    publishedAt: '2023-06-05T10:00:00+02:00',
    legacyUrl:
      '/2023/06/05/le-poids-volumetrique-dans-le-transport-comment-optimiser-votre-budget-et-reduire-limpact-economique/',
  },
];
