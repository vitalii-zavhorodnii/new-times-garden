import { Module } from '@nestjs/common';

import { ActionsController } from './actions.controller';
import { GardensModule } from '@domain/gardens/gardens.module';
import { PlantsModule } from '@domain/plants/plants.module';
import { UsersModule } from '@domain/users/users.module';
import { AchievementsModule } from 'domain/achievements/achievements.module';

@Module({
  providers: [],
  controllers: [ActionsController],
  imports: [UsersModule, GardensModule, PlantsModule, AchievementsModule]
})
export class ActionsModule {}
