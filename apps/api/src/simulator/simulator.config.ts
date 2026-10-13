/**
 * Paramètres du simulateur d'économies.
 *
 * ⚠ À CALIBRER PAR L'ÉQUIPE ColisConsult à partir de l'historique des missions.
 * Les valeurs ci-dessous sont un point de départ cohérent avec la fourchette
 * publique « 3 à 22 % d'économies constatées » ; elles ne reposent pas sur
 * des données de mission.
 */
export const SIMULATOR_CONFIG = {
  /** Bornes absolues affichées (fourchette publique) */
  floorPct: 3,
  ceilingPct: 22,

  /** Fourchette de départ par type de flux, en % du budget concerné */
  flows: {
    express_international: { low: 8, high: 22 },
    parcel_domestic: { low: 5, high: 15 },
    parcel_international: { low: 6, high: 18 },
    pallets: { low: 4, high: 12 },
    charter: { low: 3, high: 10 },
  },

  /** Ajustement selon l'ancienneté du dernier appel d'offres (points de %) */
  lastTender: {
    never: { low: 2, high: 3 },
    over3: { low: 1, high: 2 },
    '1to3': { low: 0, high: 0 },
    under1: { low: -2, high: -3 },
  },

  /** Ajustement selon le nombre de transporteurs utilisés */
  carriers: {
    one: { low: 0, high: 1 }, // dépendance à un seul transporteur : plus de marge
    twoToThree: { low: 0, high: 0 },
    fourPlus: { low: -1, high: -1 }, // déjà mis en concurrence
  },

  /** Modèle « au résultat » : part des économies facturée, et durée de partage */
  successFee: { share: 0.33, minMonths: 12, maxMonths: 24 }, // support commercial 2024 : 12 ou 24 mois

  /** Budgets habituels des clients accompagnés */
  typicalBudget: { min: 150_000, max: 10_000_000 },
} as const;

export type FlowKey = keyof typeof SIMULATOR_CONFIG.flows;
export type LastTenderKey = keyof typeof SIMULATOR_CONFIG.lastTender;
