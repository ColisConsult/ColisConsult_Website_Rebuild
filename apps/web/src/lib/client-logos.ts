import type { StaticImageData } from 'next/image';
import danone from '@/assets/logos/danone.png';
import ubisoft from '@/assets/logos/ubisoft.png';
import patagonia from '@/assets/logos/patagonia.png';
import laMartiniere from '@/assets/logos/la-martiniere.png';
import dakine from '@/assets/logos/dakine.png';
import pacoRabanne from '@/assets/logos/paco-rabanne.png';
import veepee from '@/assets/logos/veepee.png';
import vestiaireCollective from '@/assets/logos/vestiaire-collective.png';
import melijoe from '@/assets/logos/melijoe.png';
import lacoste from '@/assets/logos/lacoste.png';
import philibert from '@/assets/logos/philibert.png';
import arkema from '@/assets/logos/arkema.png';
import plasticOmnium from '@/assets/logos/plastic-omnium.png';
import firmenich from '@/assets/logos/firmenich.png';
import airis from '@/assets/logos/airis.png';
import atlasCopco from '@/assets/logos/atlas-copco.png';
import zodiac from '@/assets/logos/zodiac.png';
import renault from '@/assets/logos/renault.png';
import radiall from '@/assets/logos/radiall.png';
import alcontrol from '@/assets/logos/alcontrol.png';
import hologramIndustries from '@/assets/logos/hologram-industries.png';
import biogen from '@/assets/logos/biogen.png';
import nutricia from '@/assets/logos/nutricia.png';
import lifeTechnologies from '@/assets/logos/life-technologies.png';
import ucb from '@/assets/logos/ucb.png';
import orphanEurope from '@/assets/logos/orphan-europe.png';
import protilab from '@/assets/logos/protilab.png';
import therascience from '@/assets/logos/therascience.png';
import cetofine from '@/assets/logos/cetofine.png';
import beiersdorf from '@/assets/logos/beiersdorf.png';
import bioderma from '@/assets/logos/bioderma.png';
import esteeLauder from '@/assets/logos/estee-lauder.png';
import eugenePerma from '@/assets/logos/eugene-perma.png';
import anneSemonin from '@/assets/logos/anne-semonin.png';
import beautePrestigeInternational from '@/assets/logos/beaute-prestige-international.png';
import adp from '@/assets/logos/adp.png';
import regus from '@/assets/logos/regus.png';
import ipsos from '@/assets/logos/ipsos.png';
import cnpAssurances from '@/assets/logos/cnp-assurances.png';
import groupama from '@/assets/logos/groupama.png';
import smacl from '@/assets/logos/smacl.png';
import unibail from '@/assets/logos/unibail.png';
import westfield from '@/assets/logos/westfield.png';
import cellhire from '@/assets/logos/cellhire.png';
import infractive from '@/assets/logos/infractive.png';

/**
 * Logos clients (monochromes, fond transparent) issus du dossier « 03_Logos/05_Clients »
 * et du mur de logos ColisConsult. Classement par secteur repris de ce mur.
 * Pour ajouter un logo : déposer le PNG dans src/assets/logos puis l'ajouter ici.
 */
export type Sector = 'retail' | 'ecommerce' | 'industrie' | 'medical' | 'cosmetique' | 'service';

export interface ClientLogo {
  slug: string;
  name: string;
  sector: Sector;
  src: StaticImageData;
}

export const clientLogos: ClientLogo[] = [
  { slug: 'danone', name: 'Danone', sector: 'retail', src: danone },
  { slug: 'ubisoft', name: 'Ubisoft', sector: 'retail', src: ubisoft },
  { slug: 'patagonia', name: 'Patagonia', sector: 'retail', src: patagonia },
  { slug: 'la-martiniere', name: 'La Martinière Groupe', sector: 'retail', src: laMartiniere },
  { slug: 'dakine', name: 'Dakine', sector: 'retail', src: dakine },
  { slug: 'paco-rabanne', name: 'Paco Rabanne', sector: 'retail', src: pacoRabanne },
  { slug: 'veepee', name: 'Veepee', sector: 'ecommerce', src: veepee },
  { slug: 'vestiaire-collective', name: 'Vestiaire Collective', sector: 'ecommerce', src: vestiaireCollective },
  { slug: 'melijoe', name: 'Melijoe', sector: 'ecommerce', src: melijoe },
  { slug: 'lacoste', name: 'Lacoste', sector: 'ecommerce', src: lacoste },
  { slug: 'philibert', name: 'Philibert', sector: 'ecommerce', src: philibert },
  { slug: 'arkema', name: 'Arkema', sector: 'industrie', src: arkema },
  { slug: 'plastic-omnium', name: 'Plastic Omnium', sector: 'industrie', src: plasticOmnium },
  { slug: 'firmenich', name: 'Firmenich', sector: 'industrie', src: firmenich },
  { slug: 'airis', name: 'Airis LED', sector: 'industrie', src: airis },
  { slug: 'atlas-copco', name: 'Atlas Copco', sector: 'industrie', src: atlasCopco },
  { slug: 'zodiac', name: 'Zodiac', sector: 'industrie', src: zodiac },
  { slug: 'renault', name: 'Renault', sector: 'industrie', src: renault },
  { slug: 'radiall', name: 'Radiall', sector: 'industrie', src: radiall },
  { slug: 'alcontrol', name: 'ALcontrol Laboratories', sector: 'industrie', src: alcontrol },
  { slug: 'hologram-industries', name: 'Hologram Industries', sector: 'industrie', src: hologramIndustries },
  { slug: 'biogen', name: 'Biogen', sector: 'medical', src: biogen },
  { slug: 'nutricia', name: 'Nutricia', sector: 'medical', src: nutricia },
  { slug: 'life-technologies', name: 'Life Technologies', sector: 'medical', src: lifeTechnologies },
  { slug: 'ucb', name: 'UCB Pharma', sector: 'medical', src: ucb },
  { slug: 'orphan-europe', name: 'Orphan Europe (Recordati)', sector: 'medical', src: orphanEurope },
  { slug: 'protilab', name: 'Prot’iLab', sector: 'medical', src: protilab },
  { slug: 'therascience', name: 'Therascience', sector: 'medical', src: therascience },
  { slug: 'cetofine', name: 'Cétofine', sector: 'medical', src: cetofine },
  { slug: 'beiersdorf', name: 'Beiersdorf', sector: 'cosmetique', src: beiersdorf },
  { slug: 'bioderma', name: 'Bioderma', sector: 'cosmetique', src: bioderma },
  { slug: 'estee-lauder', name: 'Estée Lauder', sector: 'cosmetique', src: esteeLauder },
  { slug: 'eugene-perma', name: 'Eugène Perma', sector: 'cosmetique', src: eugenePerma },
  { slug: 'anne-semonin', name: 'Anne Semonin', sector: 'cosmetique', src: anneSemonin },
  { slug: 'beaute-prestige-international', name: 'Beauté Prestige International', sector: 'cosmetique', src: beautePrestigeInternational },
  { slug: 'adp', name: 'ADP', sector: 'service', src: adp },
  { slug: 'regus', name: 'Regus', sector: 'service', src: regus },
  { slug: 'ipsos', name: 'Ipsos', sector: 'service', src: ipsos },
  { slug: 'cnp-assurances', name: 'CNP Assurances', sector: 'service', src: cnpAssurances },
  { slug: 'groupama', name: 'Groupama Loire Bretagne', sector: 'service', src: groupama },
  { slug: 'smacl', name: 'Smacl Assurances', sector: 'service', src: smacl },
  { slug: 'unibail', name: 'Unibail', sector: 'service', src: unibail },
  { slug: 'westfield', name: 'Westfield', sector: 'service', src: westfield },
  { slug: 'cellhire', name: 'Cellhire', sector: 'service', src: cellhire },
  { slug: 'infractive', name: 'Infractive', sector: 'service', src: infractive },
];

/** Sélection pour le bandeau de l'accueil (noms les plus parlants, tous secteurs) */
export const homeLogoSlugs = [
  'lacoste',
  'danone',
  'renault',
  'ubisoft',
  'firmenich',
  'plastic-omnium',
  'vestiaire-collective',
  'patagonia',
  'bioderma',
  'arkema',
  'adp',
  'regus',
];

export function logosBySlug(slugs: string[]) {
  return slugs.map((s) => clientLogos.find((l) => l.slug === s)).filter((l): l is ClientLogo => !!l);
}

/** Hauteur d'affichage équilibrée optiquement : un logo très large est affiché moins haut */
export function logoHeight(src: StaticImageData, base = 30) {
  const ratio = src.width / src.height;
  return Math.round(Math.min(base * 1.55, Math.max(base * 0.5, base / Math.pow(ratio, 0.42))));
}

/** Normalise un nom de client pour le rapprocher d'un logo (accents, casse, ponctuation) */
export function normalizeName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
