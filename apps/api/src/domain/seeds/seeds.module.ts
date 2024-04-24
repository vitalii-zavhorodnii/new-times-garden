import { Module } from '@nestjs/common';

import { SeedsController } from './seeds.controller';

@Module({
    controllers: [SeedsController],
    // providers: [BenefitsService],
    // exports: [BenefitsService]
})
export class SeedsModule { }