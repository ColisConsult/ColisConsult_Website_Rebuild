/**
 * Textes du site — français (langue principale).
 *
 * Règle éditoriale : des phrases courtes, des chiffres sourcés.
 * - Résultats clients : extraits de recommandations LinkedIn ou de témoignages vidéo (cf. seed-data de l'API).
 * - Rémunération, étapes, conseils : repris du support commercial ColisConsult 2024.
 * - IA : les trois usages validés (analyse des factures, pré-audit accéléré, analyse des offres).
 */
const fr = {
  meta: {
    siteName: 'ColisConsult',
    title: 'ColisConsult · Réduire ses coûts de transport colis et palettes',
    description:
      'Cabinet indépendant d’appels d’offres transport depuis 2005. Nous négocions vos tarifs colis et palettes auprès de tout le marché, vos transporteurs actuels compris. 3 à 22 % d’économies constatées, rémunération au résultat.',
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
    translatedFrom: { fr: 'Traduit du français', en: 'Traduit de l’anglais' },
    aiAssisted: 'Assisté par IA',
    bookMeeting: 'Réserver 15 min avec Matthieu',
    allArticles: 'Tous les articles',
    allTestimonials: 'Tous les témoignages',
    backToBlog: 'Retour au blog',
    publishedOn: 'Publié le',
    inFrench: 'Article en français',
    deliverables: 'Livrables',
    included: 'Inclus',
    pricing: 'Tarif',
    contactUs: 'Nous contacter',
    linkedinReco: 'Recommandation LinkedIn',
    playVideo: 'Lire la vidéo',
    videoIn: { fr: 'Vidéo en français', en: 'Vidéo en anglais' },
    callUs: 'Appelez-nous',
  },

  home: {
    hero: {
      title: 'Payez moins cher vos colis et vos palettes. Souvent sans changer de transporteur.',
      lead: 'Nous menons votre appel d’offres transport de A à Z, auprès de tout le marché, vos transporteurs actuels compris. Et nous sommes payés sur les économies obtenues.',
      ctaPrimary: 'Demander mon pré-audit gratuit',
      ctaSecondary: 'Estimer mes économies',
      guarantee: 'Pas d’économies, pas d’honoraires.',
      reassurance: ['Gratuit et sans engagement', 'Accord de confidentialité signé avant tout échange'],
      photoAlt: 'Matthieu Erly, fondateur de ColisConsult, en conférence devant des professionnels de la logistique',
      photoCaption: 'Matthieu Erly, fondateur du cabinet, en conférence',
      proof: {
        value: '−19 %',
        text: 'sur nos contrats colis et palettes, sans changer de transporteur',
        author: 'Michael Benyamin',
        role: 'Responsable commercial, Airis LED',
      },
    },
    logos: { title: 'Ils nous ont confié leurs achats de transport' },
    results: {
      title: 'Des économies vérifiées sur facture.',
      lead: 'Ce sont nos clients qui le disent, dans les recommandations qu’ils ont publiées sur LinkedIn.',
      footnote: 'Nos clients ont des budgets transport de 150 k€ à plus de 10 M€ par an. Économies constatées : de 3 à 22 %.',
      more: 'Tous les témoignages',
    },
    how: {
      title: 'Vous nous confiez vos factures. Nous faisons le reste.',
      steps: [
        {
          title: 'Pré-audit gratuit',
          text: 'Sous accord de confidentialité, nous analysons vos dernières factures et chiffrons vos économies possibles.',
        },
        {
          title: 'Appel d’offres',
          text: 'Nous consultons tout le marché, vos transporteurs actuels compris, et négocions chaque ligne, suppléments inclus.',
        },
        {
          title: 'Suivi des économies',
          text: 'Nous contrôlons les nouveaux tarifs sur vos premières factures, puis mesurons les gains tous les six mois.',
        },
      ],
      duration: 'Comptez 2 à 3 mois entre le lancement et la présentation des offres.',
      cta: 'Le détail de notre méthode',
      photoAlt: 'Stéphane Gravier analysant les données d’un appel d’offres à son poste',
      photoCaption: 'Stéphane Gravier, coordinateur de projets, chez ColisConsult depuis 2015',
    },
    ai: {
      title: 'L’IA lit chaque ligne de vos factures. Nos experts décident.',
      lead: 'Un pré-audit plus rapide, des offres comparées à l’euro près, et rien ne vous parvient sans vérification humaine.',
      items: [
        { title: 'Analyse des factures', text: 'Suppléments injustifiés, erreurs de zone ou de poids : tout est contrôlé.' },
        { title: 'Pré-audit accéléré', text: 'Votre profil d’expédition reconstitué à partir de vos factures, sans ressaisie.' },
        { title: 'Analyse des offres', text: 'Chaque grille simulée sur vos envois réels, suppléments compris.' },
      ],
      cta: 'Comment nous utilisons l’IA',
      photoAlt: 'Majdi Hammami analysant des grilles tarifaires de transporteurs sur deux écrans',
      photoCaption: 'Majdi Hammami, expert data transport, chez ColisConsult depuis 2016',
    },
    insight: {
      title: 'Ce que révèle une analyse de factures',
      shipments: 'des envois',
      spend: 'de la dépense',
      text: 'Chez ce client, les colis de plus de 10 kg représentaient 14,6 % des envois, mais près de la moitié du budget. Savoir où se concentre la dépense, c’est savoir où négocier.',
      legendHeavy: 'Colis de plus de 10 kg',
      legendOther: 'Autres colis',
      source: 'Audit réel d’un client, données anonymisées',
    },
    model: {
      title: 'Vous ne payez que si vous économisez.',
      facts: [
        { value: '0 €', label: 'si nous n’obtenons aucune économie, ou si vous ne retenez aucune offre' },
        { value: '6 mois', label: 'd’économies vérifiées sur vos factures avant notre première facture' },
        { value: '33 %', label: 'des économies réalisées, pendant 12 à 24 mois seulement' },
        { value: '100 %', label: 'des économies pour vous ensuite' },
      ],
      note: 'Formule au résultat validée lors du pré-audit. Vous préférez un forfait ? C’est possible aussi.',
      cta: 'Nos formules',
    },
    videos: {
      title: 'Ils racontent leur appel d’offres',
      linkedin: 'Lire les recommandations de nos clients sur LinkedIn',
    },
    founder: {
      title: 'Vous travaillez avec ceux qui font le travail.',
      text: 'Matthieu Erly a fondé ColisConsult en 2005, après plusieurs années chez des transporteurs. Il pilote chaque mission avec une équipe de spécialistes de la donnée et de l’achat de transport, à Saint-Maur-des-Fossés.',
      team: 'Rencontrer l’équipe',
      photoAlt: 'Matthieu Erly, fondateur de ColisConsult, au bureau',
    },
    resources: {
      title: 'Pour les acheteurs transport',
      blog: 'Derniers articles',
      rankingsTitle: 'Palmarès de la livraison e-commerce',
      rankingsText: '518 sites e-commerce passés au crible, sur 29 critères.',
      rankingsCta: 'Découvrir le palmarès',
      webinars: 'Prochains webinars',
      noWebinar: 'Aucun webinar programmé pour le moment. Les replays sont sur notre chaîne YouTube.',
      register: 'S’inscrire',
      replay: 'Voir le replay',
    },
    final: {
      title: 'Combien payez-vous de trop ?',
      text: 'Envoyez-nous vos dernières factures. Sous accord de confidentialité, nous chiffrons gratuitement votre potentiel d’économies.',
    },
  },

  method: {
    title: 'Un appel d’offres transport, mené de bout en bout.',
    lead: 'Pour des PME, des e-commerçants et des grands groupes depuis 2005. Objectif : les meilleures conditions du marché, y compris chez vos transporteurs actuels, sans rien céder sur la qualité de service.',
    photoAlt: 'Matthieu Erly en pleine analyse d’un dossier',
    photoCaption: 'Matthieu Erly, fondateur, pilote chaque mission',
    scopeTitle: 'Ce que nous mettons en concurrence',
    scope: ['Colis B2B et B2C', 'Express national et international', 'Messagerie palettes', 'Affrètement', 'France, Europe, monde'],
    stepsTitle: 'Six étapes, un seul interlocuteur',
    stepsLead: 'Comptez 2 à 3 mois entre la collecte des données et la présentation des offres.',
    steps: [
      {
        title: 'Pré-audit gratuit',
        text: 'Nous signons un accord de confidentialité, vous nous transmettez vos dernières factures, nous vous donnons une fourchette d’économies. Sans engagement.',
        ai: true,
      },
      {
        title: 'Préparation',
        text: 'Audit de vos flux et dossier d’appel d’offres : statistiques de consommation, matrices de cotation représentatives, questionnaire technique.',
        ai: true,
      },
      {
        title: 'Consultation',
        text: 'Nous gérons toutes les étapes avec les transporteurs, du sourcing aux négociations finales. Vos transporteurs actuels sont invités à se repositionner.',
        ai: false,
      },
      {
        title: 'Analyse des offres',
        text: 'Tarifs, suppléments et réponses techniques comparés sur vos envois réels, dans un comparatif de synthèse avec simulation des économies.',
        ai: true,
      },
      {
        title: 'Sélection',
        text: 'Une recommandation impartiale, puis la vérification des contrats : chaque avantage négocié doit y figurer.',
        ai: false,
      },
      {
        title: 'Suivi des économies',
        text: 'Contrôle des premières factures (tarifs et suppléments), puis mesure des économies tous les six mois.',
        ai: true,
      },
    ],
    tipsTitle: 'Ce que vingt ans d’appels d’offres nous ont appris',
    tips: [
      'Décrire précisément sa consommation et son organisation transport.',
      'Distinguer poids réels et poids facturés, dans le dossier comme dans les comparaisons.',
      'Laisser au moins trois semaines aux transporteurs pour répondre.',
      'Comparer les tarifs suppléments compris.',
      'Ne pas regarder que les économies : derrière chaque envoi, il y a un client.',
      'Éviter de multiplier les prestataires en « cherry picking ».',
      'Aborder l’informatique (EDI, TMS…) dès le début du projet.',
      'Ne pas démarrer trop vite, ni plusieurs nouveaux transporteurs à la fois.',
    ],
    independenceTitle: 'Indépendants des transporteurs',
    independence: [
      { title: 'Vous restez client en direct', text: 'Nous ne revendons pas de transport : vous contractez avec les transporteurs que vous choisissez.' },
      { title: 'Tout le marché est consulté', text: 'Y compris les transporteurs avec qui vous travaillez déjà.' },
      { title: 'Vous gardez la main', text: 'Aucune obligation de retenir les offres que nous vous présentons.' },
    ],
    pricingTitle: 'Deux façons de nous rémunérer',
    pricing: {
      result: {
        title: 'Au résultat',
        points: [
          'Aucun coût sans économies, ou si vous ne retenez aucune offre.',
          'Aucun paiement avant six mois d’économies vérifiées sur factures.',
          '33 % des économies, pendant 12 à 24 mois seulement.',
          'Ensuite, vous gardez 100 % des économies.',
        ],
      },
      fixed: {
        title: 'Au forfait',
        points: [
          'Un prix fixe, défini à l’avance selon le périmètre.',
          'Possible aussi en formule mixte : forfait réduit et part au résultat.',
          'Les missions d’audit et de benchmark sont toujours au forfait.',
        ],
      },
      cta: 'Demander nos conditions',
    },
  },

  ai: {
    title: 'L’IA lit tout. Nos consultants décident.',
    lead: 'Une facture transport, ce sont des centaines de lignes et des dizaines de suppléments. L’IA les traite en entier ; nos consultants jugent, négocient et conseillent.',
    rows: { problem: 'Le problème', ai: 'Ce que fait l’IA', human: 'Ce que fait le consultant' },
    uses: [
      {
        title: 'Analyse des factures',
        problem: 'Sur des milliers de lignes, un supplément appliqué deux fois ou un poids mal facturé passe inaperçu.',
        ai: 'Extrait toutes les lignes, PDF ou Excel, et les contrôle contre vos conditions tarifaires.',
        human: 'Qualifie chaque écart : vous n’entendez parler que de ce qui est réel et récupérable.',
      },
      {
        title: 'Pré-audit accéléré',
        problem: 'Estimer vos économies impose de reconstituer vos flux : destinations, poids, services.',
        ai: 'Reconstitue votre profil d’expédition à partir de vos factures, sans ressaisie.',
        human: 'Le confronte aux conditions qu’il négocie chaque semaine, et vous donne une fourchette en quelques jours.',
      },
      {
        title: 'Analyse des offres',
        problem: 'Chaque transporteur répond avec ses grilles, ses zones et ses suppléments : impossible de comparer tel quel.',
        ai: 'Normalise les grilles et simule chaque offre sur vos envois réels, suppléments compris.',
        human: 'Challenge les réponses, négocie, et pèse ce qui ne se chiffre pas : fiabilité, service, couverture.',
      },
    ],
    limitsTitle: 'Ce que l’IA ne fait pas chez nous',
    limits: [
      { title: 'Négocier', text: 'C’est le métier de nos consultants, et une affaire de relation avec les transporteurs.' },
      { title: 'Choisir à votre place', text: 'La décision vous appartient, sur une recommandation argumentée.' },
      { title: 'Conclure sans relecture', text: 'Aucun résultat ne vous est transmis sans vérification humaine.' },
    ],
    dataTitle: 'Vos données restent les vôtres',
    dataText:
      'Un accord de confidentialité est signé avant tout échange de factures. Vos données servent uniquement à votre mission, et vous pouvez demander leur suppression à tout moment.',
    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'L’IA remplace-t-elle vos consultants ?',
        a: 'Non. Elle prend en charge le volume : la lecture et le contrôle des données. Les décisions, les négociations et les recommandations restent le travail de nos consultants, comme depuis 2005.',
      },
      {
        q: 'Dois-je préparer mes données dans un format particulier ?',
        a: 'Non. Vos factures telles que vous les recevez suffisent, en PDF ou en Excel.',
      },
      {
        q: 'Combien de temps prend un pré-audit ?',
        a: 'Quelques jours à réception de vos factures.',
      },
      {
        q: 'Mes transporteurs actuels sont-ils exclus ?',
        a: 'Au contraire : ils sont consultés comme les autres. Beaucoup de nos clients obtiennent de meilleures conditions sans changer de transporteur.',
      },
    ],
  },

  services: {
    title: 'Une mission pour chaque besoin.',
    lead: 'De l’appel d’offres complet au tableau de bord de vos dépenses, selon votre volume et votre maturité achats.',
    offers: [
      {
        id: 'appel-d-offres',
        tag: 'Mission phare',
        title: 'Appel d’offres transport',
        text: 'Votre appel d’offres colis, messagerie palettes ou affrètement, du pré-audit au suivi des économies.',
        includes: [
          'Pré-audit gratuit sous NDA',
          'Dossier d’appel d’offres et matrices de cotation',
          'Consultation et négociation',
          'Analyse comparative des offres',
          'Vérification des contrats et des premières factures',
          'Mesure des économies tous les six mois',
        ],
        price: 'Au résultat, au forfait ou en formule mixte',
      },
      {
        id: 'audit-benchmark',
        tag: 'Diagnostic',
        title: 'Audit & benchmark',
        text: 'Savoir où vous en êtes avant d’agir : vos coûts, vos flux, et ce que paient des expéditeurs comparables.',
        includes: [
          'Audit de factures ou de flux',
          'Benchmark tarifaire',
          'Cartographie de votre consommation transport',
          'Mise en place d’outils comparateurs',
        ],
        price: 'Au forfait',
      },
      {
        id: 'dashboard-power-bi',
        tag: 'Pilotage',
        title: 'Dashboard Power BI',
        text: 'Vos factures transport en tableaux de bord : coûts par transporteur, par période et par zone, pistes d’optimisation.',
        includes: [
          'Analyse de vos factures',
          'Création des tableaux de bord',
          'Formation à leur utilisation',
          'Livraison en 3 à 5 jours ouvrés',
        ],
        price: '999 € par transporteur, prix fixe (offre de lancement)',
      },
      {
        id: 'diagnostic-e-commerce',
        tag: 'E-commerce',
        title: 'Diagnostic livraison e-commerce',
        text: 'La livraison et les retours de votre site évalués selon les critères de notre palmarès.',
        includes: [
          'Vos notes sur les 29 critères du palmarès',
          'Livraison et retours passés en revue',
          'Recommandations concrètes',
        ],
        price: 'Au forfait',
      },
    ],
    cta: 'Demander nos conditions',
  },

  clients: {
    title: '150+ entreprises nous ont confié leurs transports.',
    lead: 'PME, e-commerçants et grands groupes, avec des budgets transport de 150 k€ à plus de 10 M€ par an.',
    sectors: {
      retail: 'Retail',
      ecommerce: 'E-commerce',
      industrie: 'Industrie',
      medical: 'Santé',
      cosmetique: 'Cosmétique',
      service: 'Services',
    },
    alsoTitle: 'Et aussi',
    videosTitle: 'En vidéo',
    testimonialsTitle: 'Ce qu’ils en disent',
    testimonialsLead: 'Extraits des recommandations publiées par nos clients sur LinkedIn.',
    linkedin: 'Lire les recommandations complètes sur LinkedIn',
  },

  team: {
    title: 'Une équipe resserrée. Des interlocuteurs directs.',
    lead: 'Le cabinet est dirigé par son fondateur, Matthieu Erly, qui pilote chaque mission. Autour de lui, des spécialistes de la donnée et de l’achat de transport.',
    photoAlt: 'Stéphane Gravier, Matthieu Erly et Majdi Hammami dans les bureaux de ColisConsult',
    photoCaption: 'Stéphane, Matthieu et Majdi, à Saint-Maur-des-Fossés',
    membersTitle: 'L’équipe',
    since: 'chez ColisConsult depuis',
    speakerTitle: 'Sur scène et en webinar',
    speakerText:
      'Matthieu intervient régulièrement en conférences et en webinars sur l’achat de transport, souvent aux côtés de clients.',
    speakerPhotoAlt: 'Table ronde avec Lacoste et Melijoe, animée par Matthieu Erly',
    speakerCaption: 'Table ronde avec les responsables transport de Melijoe et de Lacoste',
    facts: [
      { value: '2005', label: 'Création du cabinet, indépendant de tout transporteur' },
      { value: '15 000+', label: 'Abonnés à la communauté LinkedIn animée par Matthieu Erly' },
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
      { value: '1 212', label: 'tarifs de livraison comparés' },
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
    title: 'Le blog de l’acheteur transport',
    lead: 'Conseils, analyses et retours d’expérience pour mieux acheter le transport de colis et de palettes.',
    empty: 'Aucun article publié pour le moment.',
    webinarsTitle: 'Webinars',
    replays: 'Replays',
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
      over3: 'Il y a plus de 3 ans',
      '1to3': 'Il y a 1 à 3 ans',
      under1: 'Il y a moins d’un an',
    },
    submit: 'Estimer mes économies',
    computing: 'Calcul…',
    resultTitle: 'Économies annuelles estimées',
    ofBudget: 'soit {low} à {high} % de votre budget transport',
    netTitle: 'Gain net la 1re année avec la formule au résultat',
    netNote: 'Honoraires de 33 % des économies, pendant 12 à 24 mois. Ensuite, 100 % des économies sont pour vous.',
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
    title: 'Découvrez combien vous pouvez économiser.',
    lead: 'Gratuit, sans engagement et sous accord de confidentialité. Vous recevez une fourchette d’économies en quelques jours.',
    stepsTitle: 'Comment ça se passe',
    steps: [
      { title: 'Vous nous écrivez', text: 'Quelques champs, ci-contre.' },
      { title: 'Nous signons un NDA', text: 'Pour garantir la confidentialité de vos données.' },
      {
        title: 'Vous transmettez vos factures',
        text: 'La dernière facture détaillée de chaque transporteur principal, en PDF ou Excel.',
      },
      { title: 'Nous chiffrons', text: 'Vous recevez une fourchette d’économies réalisables.' },
    ],
    contactTitle: 'Une question avant de vous lancer ?',
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
      'Vous pouvez aussi nous les transmettre après signature du NDA. PDF, Excel ou CSV · 10 fichiers · 15 Mo par fichier.',
    filesDrop: 'Glissez vos fichiers ici, ou',
    filesBrowse: 'parcourez',
    filesRemove: 'Retirer',
    success: 'Merci, votre demande est bien reçue. Nous revenons vers vous rapidement avec l’accord de confidentialité.',
  },

  contact: {
    title: 'Parlons de vos transports.',
    lead: 'Une question sur un appel d’offres, une offre ou un webinar ? Écrivez-nous, ou réservez directement un créneau avec Matthieu Erly.',
    direct: 'En direct',
    formTitle: 'Nous écrire',
    success: 'Merci, votre message est bien reçu. Nous vous répondons rapidement.',
    mapLink: 'Voir sur la carte',
    address: 'Adresse',
    founderRole: 'Fondateur et directeur du cabinet',
  },

  legal: {
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
    fileTooLarge: 'Fichier trop volumineux (15 Mo maximum) :',
    fileType: 'Format non accepté :',
    tooManyFiles: '10 fichiers maximum.',
  },

  footer: {
    tagline: 'Cabinet indépendant d’appels d’offres transport de colis et de palettes, en France et en Europe, depuis 2005.',
    commitment: 'Membre de 1% for the Planet : 1 % de notre chiffre d’affaires reversé à des associations environnementales depuis 2009.',
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
