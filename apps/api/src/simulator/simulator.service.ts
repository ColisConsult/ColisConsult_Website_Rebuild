import { Injectable } from '@nestjs/common';
import { SIMULATOR_CONFIG as C, type FlowKey, type LastTenderKey } from './simulator.config.js';

export interface SimulationInput {
  annualBudget: number;
  flows: FlowKey[];
  carriersCount: number;
  lastTender: LastTenderKey;
}

const round = (n: number, step = 100) => Math.round(n / step) * step;

@Injectable()
export class SimulatorService {
  estimate(input: SimulationInput) {
    const flows = input.flows.length ? input.flows : (['parcel_domestic'] as FlowKey[]);

    // Moyenne des fourchettes des flux sélectionnés
    let low = flows.reduce((s, f) => s + C.flows[f].low, 0) / flows.length;
    let high = flows.reduce((s, f) => s + C.flows[f].high, 0) / flows.length;

    const tender = C.lastTender[input.lastTender];
    low += tender.low;
    high += tender.high;

    const carriers =
      input.carriersCount <= 1
        ? C.carriers.one
        : input.carriersCount <= 3
          ? C.carriers.twoToThree
          : C.carriers.fourPlus;
    low += carriers.low;
    high += carriers.high;

    low = Math.max(C.floorPct, Math.min(low, C.ceilingPct - 3));
    high = Math.min(C.ceilingPct, Math.max(high, low + 3));
    low = Math.round(low);
    high = Math.round(high);

    const savingsLow = round((input.annualBudget * low) / 100);
    const savingsHigh = round((input.annualBudget * high) / 100);
    const keep = 1 - C.successFee.share;

    return {
      pct: { low, high },
      annualSavings: { low: savingsLow, high: savingsHigh },
      /** Gain net la 1re année avec le modèle au résultat (honoraires déduits) */
      netFirstYear: { low: round(savingsLow * keep), high: round(savingsHigh * keep) },
      successFee: C.successFee,
      budgetFit:
        input.annualBudget < C.typicalBudget.min
          ? 'below'
          : input.annualBudget > C.typicalBudget.max
            ? 'above'
            : 'typical',
      input: { ...input, flows },
    };
  }
}
