import { Module } from '@nestjs/common';
import { SimulatorController } from './simulator.controller.js';
import { SimulatorService } from './simulator.service.js';

@Module({ controllers: [SimulatorController], providers: [SimulatorService] })
export class SimulatorModule {}
