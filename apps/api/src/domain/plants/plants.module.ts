import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

import { Plant, PlantSchema } from './schemas/plant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }])],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [PlantsService]
})
export class PlantsModule {}
