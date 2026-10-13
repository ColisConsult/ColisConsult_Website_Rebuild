/**
 * Textes du site — français (langue principale).
 * Les chiffres et promesses reprennent ceux du site actuel. Les passages sur l'IA
 * décrivent les trois usages confirmés : analyse des factures, pré-audit accéléré,
 * analyse des offres d'appel d'offres.
 */
const fr = {
  meta: {
    siteName: 'ColisConsult',
    title: 'ColisConsult · Appels d’offres transport colis et palettes',
    description:
      'Cabinet indépendant d’appels d’offres transport depuis 2005. Analyse des factures et des offres assistée par IA, négociation par nos consultants : 3 à 22 % d’économies constatées, rémunération au résultat.',
  },

  nav: {
    method: 'Méthode',
    ai: 'IA',
    services: 'Offres',
    clients: 'Clients',
    team: 'Équipe',
    rankings: 'Palmarès',
    blog: 'Blog',
    cta: 'Pré-audit gratuit',
    menu: 'Menu',
    close: 'Fermer',
    skip: 'Aller au contenu',
    language: 'Langue',
  },

  common: {
    learnMore: 'En savoir plus',
    readMore: 'Lire',
    minRead: 'min de lecture',
    illustrative: 'Exemple fictif',
    translatedFrom: { fr: 'Traduit du français', en: 'Traduit de l’anglais' },
    aiAssisted: 'Assisté par IA',
    bookMeeting: 'Prendre rendez-vous avec Matthieu Erly',
    allArticles: 'Tous les articles',
    allTestimonials: 'Tous les témoignages',
    backToBlog: 'Retour au blog',
    publishedOn: 'Publié le',
    inFrench: 'Article en français',
    deliverables: 'Livrables',
    included: 'Inclus',
    pricing: 'Tarif',
    contactUs: 'Nous contacter',
  },

  figures: [
    { value: '150+', label: 'entreprises accompagnées, de la PME au grand groupe' },
    { value: '2005', label: 'année de création, en toute indépendance des transporteurs' },
    { value: '3–22 %', label: 'd’économies constatées sur les budgets transport' },
    { value: '150 k€–10 M€', label: 'de budget transport annuel chez nos clients' },
  ],

  home: {
    hero: {
      kicker: 'Cabinet indépendant d’appels d’offres transport · depuis 2005',
      titleBefore: 'Payez le',
      titleMark: 'juste prix',
      titleAfter: 'pour chaque colis et chaque palette.',
      lead: 'Nous menons vos appels d’offres transport de bout en bout. Nos outils d’IA analysent vos factures et les offres des transporteurs ; nos consultants vérifient, négocient et vous conseillent.',
      ctaPrimary: 'Lancer le pré-audit gratuit',
      ctaSecondary: 'Simuler mes économies',
      guarantee: 'Pas d’économies, pas d’honoraires.',
    },
    invoice: {
      title: 'Facture transporteur',
      meta: 'Express international · mars',
      columns: { line: 'Ligne', amount: 'Montant' },
      lines: [
        { label: 'Envoi DE · Hambourg · 4,2 kg', amount: '38,40 €' },
        { label: 'Surcharge carburant', amount: '6,91 €', flag: 'Appliquée deux fois sur 112 envois' },
        { label: 'Envoi IT · Milan · 12 kg taxés (7,4 kg réels)', amount: '61,20 €', flag: 'Poids volumétrique +62 %' },
        { label: 'Supplément zone éloignée', amount: '18,00 €', flag: 'Code postal non éligible' },
        { label: 'Envoi ES · Madrid · 2,1 kg', amount: '24,10 €' },
      ],
      totalLabel: 'Écarts détectés sur la période',
      total: '1 284,60 €',
      reviewer: 'Signalé par l’IA · vérifié par un consultant',
      note: 'Chaque écart est vérifié par un consultant avant d’être réclamé.',
    },
    clientsTitle: 'Ils optimisent leurs transports avec ColisConsult',
    ai: {
      label: 'Intelligence artificielle',
      title: 'L’IA fait le tri. Nos consultants font le reste.',
      intro:
        'Nous utilisons l’IA là où elle est vraiment utile : traiter en entier des volumes de données que personne ne lit ligne à ligne. Chaque résultat est relu par un consultant avant de vous parvenir.',
      aiCol: 'Ce que fait l’IA',
      humanCol: 'Ce que fait le consultant',
      items: [
        {
          title: 'Analyse des factures',
          ai: 'Lit vos factures transporteurs ligne à ligne et repère suppléments injustifiés, doublons, erreurs de zone ou de poids.',
          human: 'Qualifie chaque écart, écarte les faux positifs et chiffre ce qui est réellement récupérable.',
        },
        {
          title: 'Pré-audit accéléré',
          ai: 'Reconstitue votre profil d’expédition (destinations, poids, services) à partir de vos factures, sans ressaisie.',
          human: 'Le confronte aux conditions du marché et vous donne une fourchette d’économies en quelques jours.',
        },
        {
          title: 'Analyse des offres',
          ai: 'Normalise les grilles de chaque transporteur et les simule sur vos envois réels, suppléments compris.',
          human: 'Challenge les réponses, mène les négociations et vous recommande les offres à retenir.',
        },
      ],
      cta: 'Comment nous utilisons l’IA',
    },
    method: {
      label: 'Méthode',
      title: 'Un appel d’offres en six étapes, piloté de bout en bout.',
      cta: 'Le détail de notre méthode',
    },
    model: {
      label: 'Rémunération',
      title: 'Payés au résultat. Sinon, rien.',
      intro:
        'Nous ne revendons pas de transport : vous contractez directement avec les transporteurs que vous choisissez. Avec la formule au résultat, notre rémunération dépend uniquement de vos économies.',
      facts: [
        { value: '0 €', label: 'si nous n’obtenons aucune économie, ou si vous ne retenez aucune offre' },
        { value: '6 mois', label: 'd’économies vérifiées sur factures avant toute facturation' },
        { value: '33 %', label: 'des économies réalisées, pendant 12 à 36 mois seulement' },
        { value: '100 %', label: 'des économies pour vous, ensuite' },
      ],
      note: 'Vous préférez un forfait fixe ? C’est possible aussi.',
    },
    testimonials: { label: 'Témoignages', title: 'Ce qu’en disent nos clients' },
    rankings: {
      label: 'Palmarès',
      title: 'Meilleure livraison e-commerce : le palmarès ColisConsult',
      text: 'La 3e édition de notre étude indépendante sur la livraison des sites e-commerce : tarifs, seuils de gratuité et bonnes pratiques attendues par les acheteurs en ligne.',
      cta: 'Découvrir le palmarès',
    },
    resources: {
      label: 'Ressources',
      title: 'Pour les acheteurs transport',
      webinars: 'Prochains webinars',
      noWebinar:
        'Aucun webinar programmé pour le moment. Les replays sont disponibles sur notre chaîne YouTube.',
      register: 'S’inscrire',
      replay: 'Voir le replay',
    },
    final: {
      title: 'Combien payez-vous de trop ?',
      text: 'Envoyez-nous vos dernières factures. Sous accord de confidentialité, nous vous indiquons gratuitement votre potentiel d’économies.',
    },
  },

  method: {
    label: 'Notre mission',
    title: 'Mettre vos transporteurs en concurrence, pour de vrai.',
    lead: 'Depuis 2005, nous gérons des appels d’offres transport de colis et de palettes pour des PME, des e-commerçants et des grands groupes. Notre rôle : obtenir les meilleures conditions du marché, y compris auprès de vos transporteurs actuels, sans compromis sur la qualité de service.',
    scopeTitle: 'Ce que nous mettons en concurrence',
    scope: [
      { title: 'Colis B2C et B2B', text: 'E-commerce, messagerie colis, express national et international.' },
      { title: 'Messagerie palettes', text: 'Flux de palettes en France et en Europe.' },
      { title: 'Affrètement', text: 'Lots complets et partiels.' },
      { title: 'France, EMEA, monde', text: 'Des appels d’offres nationaux comme multi-pays.' },
    ],
    stepsTitle: 'Six étapes, un seul interlocuteur',
    steps: [
      {
        title: 'Pré-audit gratuit',
        short: 'Sous NDA, à partir de vos dernières factures : une fourchette d’économies, sans engagement.',
        text: 'Nous signons un accord de confidentialité, puis vous nous transmettez vos dernières factures de transport et une estimation de vos volumes annuels. Nous vous communiquons une fourchette d’économies réalisables. Sans engagement.',
        deliverables: ['Fourchette d’économies globale'],
        ai: 'L’IA reconstitue votre profil d’expédition à partir des factures.',
      },
      {
        title: 'Préparation',
        short: 'Audit de vos flux, dossier d’appel d’offres, matrices de cotation représentatives.',
        text: 'Nous auditons vos flux et rédigeons le dossier d’appel d’offres : statistiques de consommation, matrices de cotation représentatives de vos envois et questionnaire technique fondé sur vos besoins.',
        deliverables: ['Dossier d’appel d’offres', 'Matrices de cotation', 'Questionnaire technique'],
        ai: 'Analyse ligne à ligne de vos factures pour des statistiques fidèles.',
      },
      {
        title: 'Consultation',
        short: 'Sourcing et mise en concurrence des transporteurs, y compris vos prestataires actuels.',
        text: 'Nous gérons toutes les étapes avec les transporteurs, du sourcing aux négociations finales. Notre rémunération au résultat nous permet souvent d’obtenir des baisses de tarifs de la part de vos transporteurs actuels.',
        deliverables: ['Consultation pilotée', 'Négociations'],
        ai: null,
      },
      {
        title: 'Analyse des offres',
        short: 'Tarifs, suppléments et réponses techniques comparés sur vos flux réels.',
        text: 'Nous comparons en détail les tarifs, les suppléments et les réponses techniques, puis identifions les forces et faiblesses de chaque transporteur et les économies possibles.',
        deliverables: ['Analyse comparative', 'Simulation sur vos envois réels'],
        ai: 'Les grilles hétérogènes des transporteurs sont normalisées et appliquées à vos envois.',
      },
      {
        title: 'Sélection',
        short: 'Une recommandation impartiale, et des contrats vérifiés.',
        text: 'Nous vous aidons à choisir les meilleures offres en toute impartialité, et vérifions que les contrats des transporteurs retenus reprennent bien les avantages et exonérations négociés.',
        deliverables: ['Recommandation', 'Vérification des contrats'],
        ai: null,
      },
      {
        title: 'Suivi des économies',
        short: 'Contrôle des premières factures et mesure des gains tous les six mois.',
        text: 'Nous contrôlons la conformité des premières factures (tarifs et suppléments) et mesurons les économies réalisées tous les six mois.',
        deliverables: ['Contrôle des factures', 'Bilan semestriel des économies'],
        ai: 'Les écarts de facturation sont détectés automatiquement, puis vérifiés.',
      },
    ],
    independenceTitle: 'Indépendants des transporteurs',
    independence: [
      { title: 'Pas revendeurs de transport', text: 'Vous contractez en direct avec les transporteurs retenus et gardez la relation.' },
      { title: 'Tout le marché consulté', text: 'Y compris les transporteurs avec qui vous travaillez déjà.' },
      { title: 'Une recommandation impartiale', text: 'Elle dépend de vos flux et de vos exigences de service, rien d’autre.' },
    ],
    pricingTitle: 'Deux façons de nous rémunérer',
    pricing: {
      result: {
        title: 'Au résultat',
        points: [
          'Aucun coût si aucune économie n’est obtenue, ou si vous ne retenez aucune offre.',
          'Aucun paiement avant six mois d’économies vérifiées sur factures.',
          'Honoraires de 33 % des économies, sur une durée limitée de 12 à 36 mois.',
          'Au-delà, vous conservez l’intégralité de vos économies.',
        ],
      },
      fixed: {
        title: 'Au forfait',
        points: [
          'Un prix fixe, défini à l’avance selon le périmètre.',
          'Formules Classic et Premium pour les appels d’offres.',
          'Les missions d’audit et de benchmark sont toujours au forfait.',
        ],
      },
      cta: 'Demander la grille tarifaire',
    },
  },

  ai: {
    label: 'Intelligence artificielle',
    title: 'L’IA lit tout. Nos consultants décident.',
    lead: 'Une facture transport, ce sont des centaines de lignes, des dizaines de suppléments et des grilles qui changent chaque année. Nous utilisons l’IA pour traiter ces volumes en entier, et nos consultants pour ce qu’elle ne sait pas faire : juger, négocier, conseiller.',
    flow: [
      { title: 'Vos données', text: 'Factures PDF ou Excel, grilles, réponses des transporteurs.' },
      { title: 'L’IA', text: 'Lit, extrait, contrôle et normalise. Signale les écarts.' },
      { title: 'Le consultant', text: 'Qualifie, chiffre, négocie, recommande.' },
      { title: 'Vous', text: 'Décidez, sur des éléments vérifiés.' },
    ],
    rows: { problem: 'Le problème', ai: 'Ce que fait l’IA', human: 'Ce que vérifie le consultant', gain: 'Ce que vous y gagnez' },
    uses: [
      {
        title: 'Analyse des factures',
        problem: 'Sur des milliers de lignes, les erreurs de facturation passent inaperçues : supplément appliqué deux fois, mauvaise zone, poids volumétrique surestimé.',
        ai: 'Extraction de toutes les lignes de vos factures, PDF comme Excel, et contrôle systématique contre vos conditions tarifaires.',
        human: 'Chaque écart est qualifié avant d’être signalé : nous ne vous remontons que ce qui est réel et récupérable.',
        gain: 'Une vision exhaustive de vos dépenses, et des réclamations argumentées auprès de vos transporteurs.',
      },
      {
        title: 'Pré-audit accéléré',
        problem: 'Estimer un potentiel d’économies impose de reconstituer vos flux : destinations, tranches de poids, services utilisés.',
        ai: 'Reconstitution automatique de votre profil d’expédition à partir de vos dernières factures, sans ressaisie de votre part.',
        human: 'Le consultant confronte ce profil aux conditions de marché qu’il négocie au quotidien.',
        gain: 'Une fourchette d’économies en quelques jours, au lieu de plusieurs semaines.',
      },
      {
        title: 'Analyse des offres',
        problem: 'Chaque transporteur répond avec sa propre grille, ses zones et ses suppléments : les offres ne sont pas comparables telles quelles.',
        ai: 'Normalisation des grilles et simulation de chaque offre sur vos envois réels, suppléments compris.',
        human: 'Le consultant challenge les réponses, mène les négociations et pèse ce qui ne se chiffre pas : fiabilité, service, couverture.',
        gain: 'Une comparaison à l’euro près, et une recommandation que vous pouvez défendre en interne.',
      },
    ],
    limitsTitle: 'Ce que l’IA ne fait pas chez nous',
    limits: [
      { title: 'Négocier', text: 'C’est le métier de nos consultants, et une affaire de relation avec les transporteurs.' },
      { title: 'Choisir à votre place', text: 'La décision vous appartient, sur une recommandation argumentée.' },
      { title: 'Conclure sans relecture', text: 'Aucun résultat ne vous est transmis sans vérification humaine.' },
    ],
    dataTitle: 'Vos données, sous accord de confidentialité',
    dataText:
      'Un NDA est signé avant tout échange de factures. Vos données servent uniquement à votre mission, et vous pouvez demander leur suppression à tout moment.',
    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'L’IA remplace-t-elle vos consultants ?',
        a: 'Non. Elle prend en charge le volume : la lecture et le contrôle des données. Les décisions, les négociations et les recommandations restent le travail de nos consultants, comme depuis 2005.',
      },
      {
        q: 'Dois-je préparer mes données dans un format particulier ?',
        a: 'Non. Vos factures telles que vous les recevez suffisent, en PDF ou en Excel. C’est précisément ce que l’IA nous permet d’exploiter sans ressaisie.',
      },
      {
        q: 'Combien de temps prend un pré-audit ?',
        a: 'Quelques jours à réception de vos factures, au lieu de plusieurs semaines pour une analyse entièrement manuelle.',
      },
      {
        q: 'Mes transporteurs actuels sont-ils exclus ?',
        a: 'Au contraire : ils sont consultés comme les autres. Beaucoup de nos clients obtiennent de meilleures conditions sans changer de transporteur.',
      },
    ],
  },

  services: {
    label: 'Offres',
    title: 'Une mission pour chaque besoin.',
    lead: 'De l’appel d’offres complet au tableau de bord de vos dépenses, nos missions s’adaptent à votre volume et à votre maturité achats.',
    offers: [
      {
        id: 'appel-d-offres',
        tag: 'Mission phare',
        title: 'Appel d’offres transport',
        text: 'La gestion complète de votre appel d’offres colis, messagerie palettes ou affrètement, du pré-audit au suivi des économies.',
        includes: [
          'Pré-audit gratuit sous NDA',
          'Dossier d’appel d’offres et matrices de cotation',
          'Consultation et négociation avec les transporteurs',
          'Analyse comparative des offres',
          'Vérification des contrats et des premières factures',
          'Mesure des économies tous les six mois',
        ],
        price: 'Au résultat ou au forfait (formules Classic et Premium)',
      },
      {
        id: 'audit-benchmark',
        tag: 'Diagnostic',
        title: 'Audit & benchmark',
        text: 'Pour savoir précisément où vous en êtes avant d’agir : vos coûts, vos flux, et ce que paient des expéditeurs comparables.',
        includes: [
          'Audit de factures ou de flux',
          'Benchmark tarifaire',
          'Cartographie de votre consommation transport',
          'Analyse de consommation par pays',
          'Mise en place d’outils comparateurs',
        ],
        price: 'Au forfait',
      },
      {
        id: 'dashboard-power-bi',
        tag: 'Pilotage',
        title: 'Dashboard Power BI',
        text: 'Vos factures transport transformées en tableaux de bord interactifs : coûts par transporteur et par période, répartition géographique, coûts unitaires par zone, pistes d’optimisation.',
        includes: [
          'Analyse de vos factures',
          'Création des tableaux de bord',
          'Formation à leur utilisation',
          'Recommandations de nos experts',
          'Livraison en 3 à 5 jours ouvrés',
        ],
        price: '999 € par transporteur, prix fixe tout compris (offre de lancement)',
      },
      {
        id: 'diagnostic-e-commerce',
        tag: 'E-commerce',
        title: 'Diagnostic livraison e-commerce',
        text: 'L’évaluation de la livraison et des retours sur votre site, à partir des critères de notre palmarès et des bonnes pratiques du marché.',
        includes: [
          'Le détail de vos notes sur les 29 critères du palmarès',
          'Livraison et retours passés en revue',
          'Recommandations inspirées des bonnes pratiques du marché',
        ],
        price: 'Au forfait',
      },
    ],
    cta: 'Demander la grille tarifaire',
  },

  clients: {
    label: 'Clients',
    title: '150+ entreprises, du e-commerçant au grand groupe.',
    lead: 'PME, e-commerçants et grands groupes nous confient leurs appels d’offres transport depuis 2005. Voici ce qu’ils en disent.',
    segments: { enterprise: 'Grands groupes', ecommerce: 'E-commerçants', sme: 'PME' },
    namesTitle: 'Ils nous ont fait confiance',
    testimonialsTitle: 'Leurs témoignages',
  },

  team: {
    label: 'Équipe',
    title: 'Une équipe resserrée, des interlocuteurs directs.',
    lead: 'Le cabinet est dirigé par son fondateur, Matthieu Erly, qui pilote chaque mission. Autour de lui, des consultants et des analystes data spécialisés dans le transport.',
    facts: [
      { value: '2005', label: 'Création du cabinet à Saint-Maur-des-Fossés' },
      { value: '15 000+', label: 'Abonnés à la communauté LinkedIn animée par Matthieu Erly' },
      { value: '1 %', label: 'du chiffre d’affaires reversé à des associations environnementales depuis 2009' },
    ],
    linkedin: 'Profil LinkedIn',
  },

  rankings: {
    label: 'Palmarès 2024',
    title: 'Meilleure livraison e-commerce',
    lead: 'La 3e édition de notre étude indépendante sur la livraison des sites e-commerce. Une référence pour comparer ses pratiques à celles du marché.',
    stats: [
      { value: '518', label: 'sites e-commerce audités' },
      { value: '29', label: 'critères de notation' },
      { value: '1 212', label: 'tarifs de livraison comparés' },
    ],
    questionsTitle: 'Les questions auxquelles il répond',
    questions: [
      'Quels sont les meilleurs e-commerçants en matière de livraison ?',
      'Combien coûte en moyenne une livraison à domicile, et en point relais ?',
      'À partir de quel montant de panier la livraison est-elle offerte, secteur par secteur ?',
      'Quelles bonnes pratiques les acheteurs en ligne attendent-ils ?',
    ],
    methodTitle: 'Méthodologie',
    method: [
      'Deux analystes ont passé en revue les 518 sites.',
      'Les tarifs de livraison relevés sont ceux appliqués en mai 2024.',
      'Chaque site est noté sur 29 critères.',
      'Les tarifs ne comptent plus dans la note : ils sont présentés à part, avec le seuil de livraison gratuite.',
    ],
    formTitle: 'Recevoir le palmarès complet',
    formText: 'Le document de 113 pages, avec les notes des 518 sites.',
    formMessage: 'Demande du Palmarès « Meilleure livraison e-commerce 2024 » (document complet).',
    observatory: 'Consulter l’observatoire des tarifs de livraison sur Tarif-Colis.com',
  },

  blog: {
    label: 'Blog',
    title: 'Le blog de l’acheteur transport',
    lead: 'Conseils, analyses et retours d’expérience pour mieux acheter le transport de colis et de palettes.',
    empty: 'Aucun article publié pour le moment.',
    webinarsTitle: 'Webinars',
  },

  simulator: {
    label: 'Simulateur',
    title: 'Estimez vos économies en une minute.',
    lead: 'Une première estimation, fondée sur les fourchettes constatées lors de nos missions. Pour un chiffre fiable, rien ne remplace l’analyse de vos factures.',
    budget: 'Budget transport annuel',
    budgetHint: 'Toutes prestations confondues, en euros',
    flows: 'Vos flux',
    flowOptions: {
      express_international: 'Express international',
      parcel_domestic: 'Colis France',
      parcel_international: 'Colis international (route)',
      pallets: 'Messagerie palettes',
      charter: 'Affrètement',
    },
    carriers: 'Nombre de transporteurs utilisés',
    lastTender: 'Votre dernier appel d’offres',
    lastTenderOptions: {
      never: 'Jamais',
      over3: 'Il y a plus de 3 ans',
      '1to3': 'Il y a 1 à 3 ans',
      under1: 'Il y a moins d’un an',
    },
    submit: 'Estimer mes économies',
    computing: 'Calcul…',
    resultTitle: 'Économies annuelles estimées',
    ofBudget: 'soit {low} à {high} % de votre budget transport',
    netTitle: 'Gain net la 1re année avec la formule au résultat',
    netNote: 'Honoraires de 33 % des économies, sur 12 à 36 mois. Ensuite, 100 % des économies sont pour vous.',
    budgetBelow:
      'En dessous de 150 k€ de budget annuel, une mission d’audit au forfait est souvent plus adaptée qu’un appel d’offres complet.',
    budgetAbove: 'Pour un budget de cette taille, parlons-en directement : chaque périmètre est différent.',
    disclaimer:
      'Estimation indicative, bornée à la fourchette de 3 à 22 % constatée chez nos clients. Elle ne constitue pas un engagement : seul le pré-audit, sur vos factures, donne un chiffre fiable.',
    emptyState: 'Renseignez vos informations pour obtenir une estimation.',
    error: 'Le calcul n’a pas abouti. Réessayez dans un instant.',
    sendTitle: 'Recevoir cette estimation et en parler avec un consultant',
    sendCta: 'Être recontacté',
  },

  preAudit: {
    label: 'Pré-audit gratuit',
    title: 'Découvrez votre potentiel d’économies, gratuitement.',
    lead: 'Sans engagement et sous accord de confidentialité. Grâce à l’IA, nous analysons vos factures et vous communiquons une fourchette d’économies en quelques jours.',
    stepsTitle: 'Comment ça se passe',
    steps: [
      { title: 'Vous nous écrivez', text: 'Via le formulaire de cette page, en quelques champs.' },
      { title: 'Nous signons un NDA', text: 'Pour garantir la confidentialité de vos données.' },
      {
        title: 'Vous transmettez vos factures',
        text: 'La dernière facture détaillée de chaque transporteur principal (colis et palettes), en PDF ou Excel, et une estimation de vos volumes annuels.',
      },
      { title: 'Nous chiffrons', text: 'Vous recevez une fourchette d’économies globale réalisable.' },
    ],
    formTitle: 'Demander mon pré-audit',
    budget: 'Budget transport annuel',
    budgetOptions: {
      '<150k': 'Moins de 150 k€',
      '150k-500k': '150 à 500 k€',
      '500k-2m': '500 k€ à 2 M€',
      '2m-10m': '2 à 10 M€',
      '>10m': 'Plus de 10 M€',
    },
    budgetPlaceholder: 'Sélectionnez une tranche',
    carriers: 'Vos transporteurs actuels',
    carriersPlaceholder: 'Ex. DHL Express, Colissimo, Geodis…',
    message: 'Commentaires',
    files: 'Joindre vos factures',
    filesOptional: 'facultatif',
    filesHint:
      'Vous pouvez aussi nous les transmettre après signature du NDA. PDF, Excel ou CSV · 10 fichiers · 15 Mo par fichier.',
    filesDrop: 'Glissez vos fichiers ici, ou',
    filesBrowse: 'parcourez',
    filesRemove: 'Retirer',
    success: 'Merci, votre demande est bien reçue. Nous revenons vers vous rapidement avec l’accord de confidentialité.',
  },

  contact: {
    label: 'Contact',
    title: 'Parlons de vos transports.',
    lead: 'Une question sur un appel d’offres, une offre ou un webinar ? Écrivez-nous, ou réservez directement un créneau avec Matthieu Erly.',
    direct: 'En direct',
    formTitle: 'Nous écrire',
    success: 'Merci, votre message est bien reçu. Nous vous répondons rapidement.',
    mapLink: 'Voir sur la carte',
  },

  legal: {
    label: 'Informations légales',
    title: 'Mentions légales et confidentialité',
  },

  forms: {
    firstName: 'Prénom',
    lastName: 'Nom',
    company: 'Entreprise',
    jobTitle: 'Fonction',
    email: 'E-mail professionnel',
    phone: 'Téléphone',
    message: 'Message',
    optional: 'facultatif',
    consent:
      'J’accepte que ColisConsult utilise ces informations pour répondre à ma demande. Elles ne sont ni cédées ni utilisées à d’autres fins.',
    privacyLink: 'En savoir plus',
    submit: 'Envoyer',
    sending: 'Envoi…',
    error: 'L’envoi n’a pas abouti. Vérifiez les champs, ou écrivez-nous à commercial@colisconsult.com.',
    tooMany: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
    fileTooLarge: 'Fichier trop volumineux (15 Mo maximum) :',
    fileType: 'Format non accepté :',
    tooManyFiles: '10 fichiers maximum.',
  },

  footer: {
    tagline:
      'Cabinet de conseil indépendant en appels d’offres transport de colis et de palettes, en France, en EMEA et dans le monde.',
    commitment: '1 % du chiffre d’affaires reversé à des associations environnementales depuis 2009.',
    firm: 'Le cabinet',
    resources: 'Ressources',
    contact: 'Contact',
    simulator: 'Simulateur d’économies',
    webinars: 'Webinars',
    legal: 'Mentions légales',
    rights: 'Tous droits réservés.',
  },

  notFound: {
    title: 'Cette page n’existe pas (ou plus).',
    text: 'Le site a fait peau neuve : certaines adresses ont changé.',
    cta: 'Retour à l’accueil',
  },
};

export default fr;
export type Dictionary = typeof fr;
