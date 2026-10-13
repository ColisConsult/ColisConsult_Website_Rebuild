import { Test } from '@nestjs/testing';
import { ValidationPipe, type INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SimulatorModule } from '../src/simulator/simulator.module.js';

describe('POST /api/simulator/estimate (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [SimulatorModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('renvoie une fourchette bornée à 3–22 %', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/simulator/estimate')
      .send({ annualBudget: 800000, flows: ['express_international'], carriersCount: 1, lastTender: 'never' })
      .expect(200);
    expect(res.body.pct.low).toBeGreaterThanOrEqual(3);
    expect(res.body.pct.high).toBeLessThanOrEqual(22);
    expect(res.body.annualSavings.high).toBeGreaterThan(res.body.annualSavings.low);
  });

  it('refuse des paramètres invalides', async () => {
    await request(app.getHttpServer())
      .post('/api/simulator/estimate')
      .send({ annualBudget: 10, flows: ['inconnu'], carriersCount: 0, lastTender: 'hier' })
      .expect(400);
  });
});
