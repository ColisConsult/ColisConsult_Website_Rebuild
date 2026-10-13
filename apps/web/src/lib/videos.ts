/**
 * Témoignages vidéo (dossier « 02_Vidéos »), réencodés en 720p et hébergés avec le site :
 * pas de lecteur tiers ni de cookies. Fichiers dans public/videos.
 */
export interface VideoTestimonial {
  id: string;
  company: string;
  logo: string; // slug dans client-logos (facultatif)
  person: string;
  role: { fr: string; en: string };
  quote?: { fr: string; en: string; lang: 'fr' | 'en' };
  context?: { fr: string; en: string };
  src: string;
  poster: string;
  duration: string;
  lang: 'fr' | 'en';
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'melijoe',
    company: 'Melijoe',
    logo: 'melijoe',
    person: 'Mylène Gosset',
    role: { fr: 'Directrice administrative et financière', en: 'Chief Administrative & Financial Officer' },
    quote: {
      fr: 'On a réussi à baisser nos coûts de près de 20\u202f%.',
      en: 'We managed to cut our costs by almost 20%.',
      lang: 'fr',
    },
    context: {
      fr: 'Appel d’offres transport, en gardant un service de qualité.',
      en: 'Transport tender, while keeping a quality service.',
    },
    src: '/videos/temoignage-melijoe.mp4',
    poster: '/videos/affiche-melijoe.jpg',
    duration: '0:58',
    lang: 'fr',
  },
  {
    id: 'lacoste',
    company: 'Lacoste',
    logo: 'lacoste',
    person: 'Mélanie Pénaud',
    role: { fr: 'Responsable des opérations e-commerce', en: 'E-commerce Operations Manager' },
    quote: {
      fr: 'Suite à cet appel d’offres, on arrive à une enveloppe d’économies de 450\u00a0K€ par an.',
      en: 'Following this tender, we reached savings of €450k a year.',
      lang: 'fr',
    },
    context: {
      fr: 'Appel d’offres e-commerce Europe, 13\u00a0pays livrés.',
      en: 'European e-commerce tender, 13 delivery countries.',
    },
    src: '/videos/temoignage-lacoste.mp4',
    poster: '/videos/affiche-lacoste.jpg',
    duration: '1:06',
    lang: 'fr',
  },
  {
    id: 'wethenew',
    company: 'Wethenew',
    logo: '',
    person: 'Sacha Zaoui',
    role: { fr: 'Directeur des opérations (COO)', en: 'Chief Operating Officer' },
    quote: {
      fr: 'Je recommanderais ColisConsult les yeux fermés.',
      en: 'I would recommend ColisConsult without a second thought.',
      lang: 'fr',
    },
    context: {
      fr: 'De 420\u202f000 à 450\u202f000 colis expédiés par an, en France et dans l’Union européenne.',
      en: '420,000 to 450,000 parcels shipped a year, in France and across the EU.',
    },
    src: '/videos/temoignage-wethenew.mp4',
    poster: '/videos/affiche-wethenew.jpg',
    duration: '1:33',
    lang: 'fr',
  },
];
