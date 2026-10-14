/**
 * Contenu initial : site WordPress (colisconsult.com) et support commercial « MASTER FULL 2024 ».
 *
 * ⚠ Témoignages : extraits repris mot pour mot des recommandations LinkedIn reproduites dans le
 *   support commercial, ou du site actuel. Les « […] » signalent une coupe. Les traductions
 *   (FR ↔ EN) sont signalées comme telles sur le site (champ quoteLang = langue d'origine).
 *   Les témoignages « featured » avec un résultat chiffré alimentent les cartes de l'accueil.
 */
type Segment = 'enterprise' | 'ecommerce' | 'sme';

export const teamSeed = [
  {
    name: 'Matthieu Erly',
    roleFr: 'Fondateur et directeur',
    roleEn: 'Founder & Managing Director',
    bioFr:
      "Passé par les services commerciaux de plusieurs transporteurs, il fonde ColisConsult en 2005. Il pilote les missions et reste l'interlocuteur direct des clients. Intervenant régulier en conférences, il anime une communauté de plus de 15 000 abonnés sur LinkedIn et les groupes « Acheteur transport » et « DHL Express, FedEx-TNT, UPS in Europe ».",
    bioEn:
      'After working in the sales departments of several carriers, he founded ColisConsult in 2005. He leads every engagement and remains the client’s direct contact. A regular conference speaker, he runs a LinkedIn community of more than 15,000 followers and the groups “Acheteur transport” and “DHL Express, FedEx-TNT, UPS in Europe”.',
    linkedinUrl: 'https://www.linkedin.com/in/matthieuerly/',
    photoUrl: '/team/matthieu-erly.jpg',
    sortOrder: 1,
  },
  {
    name: 'Stéphane Gravier',
    roleFr: 'Coordinateur de projets',
    roleEn: 'Project Coordinator',
    bioFr:
      'Chez ColisConsult depuis 2015. Coordonne les missions aux côtés de Matthieu Erly et Majdi Hammami, du cadrage à la sélection des offres.',
    bioEn:
      'With ColisConsult since 2015. Coordinates engagements alongside Matthieu Erly and Majdi Hammami, from scoping to carrier selection.',
    linkedinUrl: null,
    photoUrl: '/team/stephane-gravier.jpg',
    sortOrder: 2,
  },
  {
    name: 'Majdi Hammami',
    roleFr: 'Expert data transport',
    roleEn: 'Transport Data Expert',
    bioFr:
      "Chez ColisConsult depuis 2016. Responsable des analyses des missions : factures, flux, grilles tarifaires et réponses des transporteurs.",
    bioEn:
      'With ColisConsult since 2016. Leads engagement analysis: invoices, shipping flows, rate cards and carrier responses.',
    linkedinUrl: null,
    photoUrl: '/team/majdi-hammami.jpg',
    sortOrder: 3,
  },
  {
    name: 'Mohamed Farsi',
    roleFr: 'Data analyst & Power BI',
    roleEn: 'Data Analyst & Power BI',
    bioFr:
      'Traite et fiabilise les données de facturation transport qui alimentent les analyses et les tableaux de bord.',
    bioEn:
      'Processes and cleans the transport billing data behind every analysis and dashboard.',
    linkedinUrl: null,
    photoUrl: '/team/mohamed-farsi.jpg',
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
    photoUrl: null,
    sortOrder: 5,
  },
  {
    name: 'Maxime Courbeyrette',
    roleFr: 'Assistant',
    roleEn: 'Assistant',
    bioFr: '',
    bioEn: '',
    linkedinUrl: null,
    photoUrl: '/team/maxime-courbeyrette.jpg',
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
    'Renault',
    'Zodiac',
    'Radiall',
    'Ipsos',
    'Columbia',
    'Westfield',
    'Unibail',
    'Groupama Loire Bretagne',
    'Smacl Assurances',
    'Hologram Industries',
    'ALcontrol Laboratories',
    'La Martinière Groupe',
    'Beauté Prestige International',
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
    'Veepee',
    'What Matters',
  ],
  sme: [
    'Guard Industrie',
    'Alma',
    'Eugène Perma',
    'Alliance Artem',
    'Let Me Repair',
    'Nowos',
    'Cétofine',
    'Clément Design',
    'Pharmacie des Drakkars',
    'BIPEA',
    "Prot'iLab",
    'Infractive',
    'Cellhire',
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
    company: 'Plastic Omnium',
    author: 'Nicole Hemard',
    role: 'Service Purchaser',
    missionFr: 'Étude et appel d’offres transport express',
    missionEn: 'Express transport study and tender',
    quoteFr: 'Matthieu a réalisé une étude précise de notre activité « transport express ».',
    quoteEn: 'Matthieu carried out a precise study of our express transport activity.',
    resultFr: '−25 % sur le transport express',
    resultEn: '−25% on express transport',
    segment: 'enterprise',
    featured: true,
    sortOrder: 1,
  },
  {
    company: 'What Matters',
    author: 'Charlotte Catton Puechbroussou',
    role: 'Cofondatrice',
    missionFr: 'Optimisation des coûts de transport',
    missionEn: 'Transport cost optimisation',
    quoteFr:
      'Je ne peux que recommander ColisConsult et l’équipe de Matthieu qui nous ont aidé à réduire de plus de 20 % nos coûts de transport, sans changer de partenaire ! Efficaces et compétents.',
    quoteEn:
      'I can only recommend ColisConsult and Matthieu’s team, who helped us cut our transport costs by more than 20% without changing partner! Efficient and skilled.',
    resultFr: '−20 % et plus, sans changer de partenaire',
    resultEn: '−20% and more, without changing partner',
    segment: 'sme',
    featured: true,
    sortOrder: 2,
  },
  {
    company: 'Cétofine',
    author: 'Benjamin Dumas',
    role: 'Responsable e-commerce',
    missionFr: 'Optimisation des contrats de transport',
    missionEn: 'Transport contract optimisation',
    quoteFr: 'L’économie réalisée a été de 16 % tout en gardant le même transporteur. En bref : je recommande…',
    quoteEn: 'We saved 16% while keeping the same carrier. In short: I recommend them…',
    resultFr: '−16 % avec le même transporteur',
    resultEn: '−16% with the same carrier',
    segment: 'sme',
    featured: true,
    sortOrder: 3,
  },
  {
    company: 'Airis LED',
    author: 'Michael Benyamin',
    role: 'Responsable commercial',
    missionFr: 'Optimisation des contrats colis et palettes',
    missionEn: 'Parcel and pallet contract optimisation',
    quoteFr:
      'Nous avons réalisé 19 % d’économies sur nos contrats de transport de colis et de palettes sans changer de transporteur.',
    quoteEn: 'We saved 19% on our parcel and pallet transport contracts without changing carrier.',
    resultFr: '−19 % sans changer de transporteur',
    resultEn: '−19% without changing carrier',
    segment: 'ecommerce',
    sortOrder: 4,
  },
  {
    company: 'ADP',
    author: 'François Renard',
    role: 'Procurement Director',
    missionFr: 'Appel d’offres transport multi-pays',
    missionEn: 'Multi-country transport tender',
    quoteFr:
      'Les résultats ont dépassé nos attentes : nous avons réalisé d’importantes économies, y compris dans les pays où nous avons décidé de garder le même transporteur.',
    quoteEn:
      'The results were beyond our expectations: we achieved large amount of savings, even in the countries where we decided to keep the same carrier.',
    quoteLang: 'en',
    segment: 'enterprise',
    sortOrder: 5,
  },
  {
    company: 'Firmenich',
    author: 'François Jacquier',
    role: 'Global Purchasing Director',
    missionFr: 'Appel d’offres transport express',
    missionEn: 'Express transport tender',
    quoteFr:
      'Au-delà d’une bien meilleure compréhension de nos flux et de la gestion de nos données, l’équipe ColisConsult a apporté une approche très pragmatique, guidée par une compréhension fine de la valeur et bien adaptée à notre activité. Les résultats ont dépassé nos attentes.',
    quoteEn:
      'Beyond understanding much better our flows and data management, the Colisconsult team brought a very pragmatic approach, driven by deep value understanding and well adapted to our business. This has driven results beyond our expectations.',
    quoteLang: 'en',
    segment: 'enterprise',
    sortOrder: 6,
  },
  {
    company: 'Nina Ricci',
    author: 'Hakima Desch-Benhemadi',
    role: 'Logistics & Customer Service Manager',
    missionFr: 'Maîtrise des coûts de transport express',
    missionEn: 'Express transport cost control',
    quoteFr:
      'Grâce à leur expertise, leur connaissance de notre industrie et leur belle capacité de négociation, ColisConsult nous ont fait bénéficier de solutions de transport plus adaptées avec une meilleure qualité de service et d’une baisse significative de nos coûts de transport Express.',
    quoteEn:
      'Thanks to their expertise, their knowledge of our industry and their strong negotiating skills, ColisConsult gave us better-suited transport solutions, with better service quality and a significant reduction in our express transport costs.',
    segment: 'ecommerce',
    sortOrder: 7,
  },
  {
    company: 'Vestiaire Collective',
    author: 'Christian Jorge',
    role: 'VP Operations',
    missionFr: 'Reprise générale du plan de transport',
    missionEn: 'Full overhaul of the transport plan',
    quoteFr: 'ColisConsult nous a permis d’améliorer significativement nos tarifs et notre volet pilotage.',
    quoteEn: 'ColisConsult helped us significantly improve our rates and our performance monitoring.',
    resultFr: 'Plusieurs milliers de colis par jour vers 45 pays',
    resultEn: 'Thousands of parcels a day to 45 countries',
    segment: 'ecommerce',
    sortOrder: 8,
  },
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
    sortOrder: 9,
  },
  {
    company: 'Pharmacie des Drakkars',
    author: 'Titouan Hébert',
    role: 'Assistant de direction',
    missionFr: 'Optimisation des coûts de transport',
    missionEn: 'Transport cost optimisation',
    quoteFr:
      'Matthieu nous a accompagnés avec rigueur, disponibilité et une grande expertise. Son approche à la fois constructive et pragmatique a permis de réduire nos coûts de transport tout en facilitant nos relations avec nos transporteurs. […] Objectif atteint.',
    quoteEn:
      'Matthieu supported us with rigour, availability and great expertise. His constructive and pragmatic approach cut our transport costs while making our relationships with our carriers easier. […] Objective achieved.',
    segment: 'sme',
    sortOrder: 10,
  },
  {
    company: 'Clément Design',
    author: 'Alexandra Mannina Fantino',
    role: 'Export Sales Manager',
    missionFr: 'Appel d’offres transport',
    missionEn: 'Transport tender',
    quoteFr:
      'ColisConsult a su nous accompagner, récupérer la data, challenger les acteurs transports et nous faire réaliser des économies concrètes et très intéressantes. Un prestataire clef en main, une équipe réactive, vraiment un temps précieux gagné.',
    quoteEn:
      'ColisConsult supported us, gathered the data, challenged the carriers and delivered concrete, very worthwhile savings. A turnkey provider and a responsive team: we saved a great deal of time.',
    segment: 'sme',
    sortOrder: 11,
  },
  {
    company: 'Regus',
    author: 'Claire Faure',
    role: 'Procurement Director',
    missionFr: 'Appels d’offres transport EMEA',
    missionEn: 'EMEA transport tenders',
    quoteFr:
      'J’ai collaboré à plusieurs reprises avec Matthieu sur des appels d’offres EMEA. Il est très expérimenté et expert dans ce domaine. Je recommande vivement ce cabinet.',
    quoteEn:
      'I have collaborated several times with Matthieu for EMEA RFQs. He is really experienced and expert in this area. I highly recommend this company.',
    quoteLang: 'en',
    segment: 'enterprise',
    sortOrder: 12,
  },
  {
    company: 'Columbia',
    author: 'Coralie Cappe',
    role: 'Sourcing Manager Europe',
    missionFr: 'Transport colis en Europe',
    missionEn: 'Parcel transport in Europe',
    quoteFr:
      'Une bonne expérience avec l’équipe ColisConsult pour notre activité colis en Europe. Flexibilité, réactivité et précision ont permis des résultats tangibles.',
    quoteEn:
      'Good experience working with Colisconsult team for our Parcel business in Europe. Flexibility, reactivity, accuracy contributed to tangible output.',
    quoteLang: 'en',
    segment: 'ecommerce',
    sortOrder: 13,
  },
  {
    company: 'Firmenich',
    author: 'Rémi Forgeot',
    role: 'Directeur financier',
    missionFr: 'Express international',
    missionEn: 'International express delivery',
    quoteFr:
      'Les résultats ont été supérieurs à nos attentes. Matthieu a été présent à chaque étape du processus, avec des conseils, des explications, et en faisant vraiment tout pour obtenir des résultats.',
    quoteEn:
      'The results were higher than expected. Matthieu was always there, at any step of the process, giving advices, explanations and really doing his best to obtain results.',
    quoteLang: 'en',
    segment: 'enterprise',
    sortOrder: 14,
  },
  {
    company: 'Life Technologies (Thermo Fisher)',
    author: 'Bruno Baudoin',
    role: 'Program Manager',
    missionFr: 'Renégociation des contrats DHL et TNT',
    missionEn: 'DHL and TNT contract renegotiation',
    quoteFr:
      'Nous avons gardé les mêmes fournisseurs, mais nous bénéficions dorénavant de tarifs plus avantageux.',
    quoteEn: 'We kept the same suppliers, but we now benefit from better rates.',
    resultFr: 'Meilleurs tarifs, mêmes transporteurs',
    resultEn: 'Better rates, same carriers',
    segment: 'enterprise',
    sortOrder: 15,
  },
  {
    company: 'Patagonia',
    author: 'Sylvain Morvan',
    role: 'IT & Logistics Director',
    missionFr: 'Optimisation des flux de transport en Europe',
    missionEn: 'European transport flow optimisation',
    quoteFr:
      'Son expérience et son réseau de connaissances lui permettent d’être d’une efficacité redoutable.',
    quoteEn: 'His experience and network make him remarkably effective.',
    segment: 'ecommerce',
    sortOrder: 16,
  },
  {
    company: 'RAJA',
    author: 'Mathieu Dubalais',
    role: 'Directeur Transport France',
    missionFr: 'Appel d’offres transport pour les entités du groupe',
    missionEn: 'Transport tender for the group’s entities',
    quoteFr: 'ColisConsult nous ont permis de gagner en efficacité dans les négociations.',
    quoteEn: 'ColisConsult made our negotiations more effective.',
    resultFr: '1,2 million de colis par an',
    resultEn: '1.2 million parcels a year',
    segment: 'ecommerce',
    sortOrder: 17,
  },
  {
    company: 'Danone',
    author: 'Bruno Peloin',
    role: 'Directeur Supply Chain, Danone Advanced Medical Nutrition (Nutricia)',
    missionFr: 'Appel d’offres transport',
    missionEn: 'Transport tender',
    quoteFr: 'Matthieu a conduit avec brio, pour le compte de Danone, un appel d’offres en 2018.',
    quoteEn: 'Matthieu brilliantly ran a tender for Danone in 2018.',
    segment: 'enterprise',
    sortOrder: 18,
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
    sortOrder: 19,
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
    sortOrder: 20,
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
    sortOrder: 21,
  },
  {
    company: 'Laboratoire Bioderma',
    author: 'Emilie Toledano',
    role: 'Responsable Supply Chain',
    missionFr: 'Optimisation des transports',
    missionEn: 'Transport optimisation',
    quoteFr: 'La collaboration d’optimisation de nos transports avec ColisConsult fut fructueuse.',
    quoteEn: 'Our transport optimisation project with ColisConsult was a success.',
    segment: 'ecommerce',
    sortOrder: 22,
  },
  {
    company: 'Balzac Paris',
    author: 'Alexandre Chevalier',
    role: 'Responsable Supply Chain',
    missionFr: 'Remise à plat du plan de distribution e-commerce',
    missionEn: 'E-commerce distribution plan overhaul',
    quoteFr:
      'Une grande expertise pour mettre en lumière nos points faibles et remettre à plat notre plan de distribution e-com.',
    quoteEn: 'Real expertise to highlight our weak points and overhaul our e-commerce distribution plan.',
    segment: 'ecommerce',
    sortOrder: 23,
  },
  {
    company: 'Anne Semonin',
    author: 'Amaury de Loisy',
    role: 'General Manager',
    missionFr: 'Optimisation des transports B2B et B2C',
    missionEn: 'B2B and B2C transport optimisation',
    quoteFr: 'Ils nous ont donné accès à de bien meilleurs tarifs pour nos activités transport B2B et B2C.',
    quoteEn: 'They gave us access to much better rates for our B2B and B2C transport.',
    segment: 'ecommerce',
    sortOrder: 24,
  },
  {
    company: 'Alma',
    author: 'Nathalie Moine',
    role: 'Responsable des achats',
    missionFr: 'Appel d’offres messagerie et palettes',
    missionEn: 'Groupage and pallet tender',
    quoteFr: 'Gestion d’un appel d’offres transport messagerie palettes avec efficacité et célérité.',
    quoteEn: 'A pallet groupage tender run efficiently and quickly.',
    segment: 'sme',
    sortOrder: 25,
  },
  {
    company: 'Eugène Perma',
    author: 'Manuel Servio',
    role: 'Logistics Director',
    missionFr: 'Analyse et benchmark des flux de livraison',
    missionEn: 'Delivery flow analysis and benchmark',
    quoteFr:
      'Matthieu et son équipe ont optimisé nos transports sur ventes en bonne intelligence avec notre logisticien.',
    quoteEn:
      'Matthieu and his team optimised our sales shipments in close cooperation with our logistics provider.',
    segment: 'sme',
    sortOrder: 26,
  },
  {
    company: 'BIPEA',
    author: 'Abdelkader Boubetra',
    role: 'Manager scientifique et technique',
    missionFr: 'Appel d’offres transport',
    missionEn: 'Transport tender',
    quoteFr: 'Très bonne approche et très bon suivi, notre collaboration a été très fructueuse !',
    quoteEn: 'A very good approach and very good follow-up: our collaboration was very fruitful!',
    segment: 'sme',
    sortOrder: 27,
  },
];

/**
 * Articles du blog WordPress (1re page). Le contenu complet s'importe avec
 * `npm run import:wordpress`, qui met à jour ces entrées par slug.
 */
/** kind : « article » (conseils, analyses) ou « news » (actualités, webinars) */
export const postsSeed = [
  {
    slug: 'recueils-des-recommandations-linkedin-deposees-par-les-clients-colisconsult',
    kind: 'news' as const,
    title: 'Recueil des recommandations LinkedIn déposées par les clients ColisConsult',
    excerpt:
      'Les recommandations laissées par nos clients, également visibles sur le profil LinkedIn de Matthieu Erly.',
    publishedAt: '2026-06-15T16:24:31+02:00',
    legacyUrl:
      '/2026/06/15/recueils-des-recommandations-linkedin-deposees-par-les-clients-colisconsult/',
  },
  {
    slug: 'webinar-un-ao-pour-contrer-les-hausses-2026-des-transporteurs-bonne-ou-mauvaise-idee',
    kind: 'news' as const,
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
    kind: 'article' as const,
    title: 'Les enjeux de la gestion des expéditions pour les e-commerçants',
    excerpt:
      'La gestion des expéditions, pilier de la stratégie commerciale des e-commerçants. Une tribune de CibleWeb.',
    publishedAt: '2024-03-05T10:00:00+01:00',
    legacyUrl: '/2024/03/05/les-enjeux-de-la-gestion-des-expeditions-pour-les-e-commercants/',
  },
  {
    slug: 'guide-2023-reussir-lenvoi-de-colis-en-toute-simplicite',
    kind: 'article' as const,
    title: 'Guide : réussir l’envoi de colis en toute simplicité',
    excerpt:
      'Emballage, choix du service, assurance : les bases pour expédier des colis sans mauvaise surprise, à titre personnel comme professionnel.',
    publishedAt: '2023-07-27T10:00:00+02:00',
    legacyUrl: '/2023/07/27/guide-2023-reussir-lenvoi-de-colis-en-toute-simplicite/',
  },
  {
    slug: 'pourquoi-vous-devriez-lancer-un-ao-transport-cet-ete',
    kind: 'article' as const,
    title: 'Pourquoi lancer un appel d’offres transport cet été ?',
    excerpt:
      'Anticiper les hausses tarifaires annuelles des transporteurs en lançant son appel d’offres dès l’été.',
    publishedAt: '2023-06-29T10:00:00+02:00',
    legacyUrl: '/2023/06/29/pourquoi-vous-devriez-lancer-un-ao-transport-cet-ete/',
  },
  {
    slug: '4-leviers-efficaces-pour-reduire-votre-budget-de-transport-express',
    kind: 'article' as const,
    title: '4 leviers efficaces pour réduire votre budget de transport express',
    excerpt:
      'Quatre leviers concrets pour faire baisser nettement votre budget de transport express.',
    publishedAt: '2023-06-09T10:00:00+02:00',
    legacyUrl: '/2023/06/09/4-leviers-efficaces-pour-reduire-votre-budget-de-transport-express/',
  },
  {
    slug: '13-erreurs-a-eviter-pour-vos-envois-de-colis',
    kind: 'article' as const,
    title: '13 erreurs à éviter pour vos envois de colis',
    excerpt:
      'Les erreurs les plus fréquentes dans l’expédition de colis, et comment les corriger.',
    publishedAt: '2023-06-08T10:00:00+02:00',
    legacyUrl: '/2023/06/08/13-erreurs-a-eviter-pour-vos-envois-de-colis/',
  },
  {
    slug: 'le-poids-volumetrique-dans-le-transport-comment-optimiser-votre-budget-et-reduire-limpact-economique',
    kind: 'article' as const,
    title: 'Le poids volumétrique : comment optimiser votre budget transport',
    excerpt:
      'Le poids volumétrique pèse de plus en plus dans la tarification. Comment le mesurer, et comment limiter son impact.',
    publishedAt: '2023-06-05T10:00:00+02:00',
    legacyUrl:
      '/2023/06/05/le-poids-volumetrique-dans-le-transport-comment-optimiser-votre-budget-et-reduire-limpact-economique/',
  },
];
