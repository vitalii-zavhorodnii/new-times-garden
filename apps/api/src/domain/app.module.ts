import { Module } from '@nestjs/common';

import { PlantsModule } from '@domain/plants/plants.module';
import { SeedsModule } from '@domain/seeds/seeds.module';

@Module({
  imports: [PlantsModule, SeedsModule]
})
export class AppModule { }
