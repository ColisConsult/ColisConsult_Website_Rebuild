import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsIn, IsInt, IsNumber, Max, Min } from 'class-validator';
import { SIMULATOR_CONFIG } from './simulator.config.js';
import { SimulatorService } from './simulator.service.js';
import type { FlowKey, LastTenderKey } from './simulator.config.js';

const FLOWS = Object.keys(SIMULATOR_CONFIG.flows);
const TENDERS = Object.keys(SIMULATOR_CONFIG.lastTender);

class EstimateDto {
  @Type(() => Number) @IsNumber() @Min(10_000) @Max(500_000_000) annualBudget!: number;
  @IsArray() @ArrayMaxSize(5) @IsIn(FLOWS, { each: true }) flows!: FlowKey[];
  @Type(() => Number) @IsInt() @Min(1) @Max(50) carriersCount!: number;
  @IsIn(TENDERS) lastTender!: LastTenderKey;
}

@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulator: SimulatorService) {}

  @Post('estimate')
  @HttpCode(200)
  estimate(@Body() dto: EstimateDto) {
    return this.simulator.estimate(dto);
  }
}
