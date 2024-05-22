import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { PlantsModule } from '@domain/plants/plants.module';

import { Achievement, AchievementSchema } from './schemas/achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema }
    ]),
    PlantsModule
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService]
})
export class AchievementsModule {}
