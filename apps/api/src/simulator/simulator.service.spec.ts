import { SimulatorService } from './simulator.service.js';

describe('SimulatorService', () => {
  const service = new SimulatorService();

  it('reste dans la fourchette publique 3–22 %', () => {
    const extremes = [
      service.estimate({ annualBudget: 1_000_000, flows: ['express_international'], carriersCount: 1, lastTender: 'never' }),
      service.estimate({ annualBudget: 1_000_000, flows: ['charter'], carriersCount: 8, lastTender: 'under1' }),
    ];
    for (const r of extremes) {
      expect(r.pct.low).toBeGreaterThanOrEqual(3);
      expect(r.pct.high).toBeLessThanOrEqual(22);
      expect(r.pct.high - r.pct.low).toBeGreaterThanOrEqual(3);
    }
  });

  it('calcule les montants et le net après honoraires au résultat', () => {
    const r = service.estimate({ annualBudget: 500_000, flows: ['parcel_domestic'], carriersCount: 2, lastTender: '1to3' });
    expect(r.pct).toEqual({ low: 5, high: 15 });
    expect(r.annualSavings).toEqual({ low: 25_000, high: 75_000 });
    expect(r.netFirstYear.low).toBe(16_800);
    expect(r.budgetFit).toBe('typical');
  });

  it('signale un budget sous le seuil habituel', () => {
    const r = service.estimate({ annualBudget: 80_000, flows: [], carriersCount: 1, lastTender: 'never' });
    expect(r.budgetFit).toBe('below');
    expect(r.input.flows).toEqual(['parcel_domestic']);
  });
});
