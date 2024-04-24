import { Module } from '@nestjs/common';

import { PlantsController } from './plants.controller';

@Module({
    controllers: [PlantsController],
    // providers: [BenefitsService],
    // exports: [BenefitsService]
})
export class PlantsModule { }