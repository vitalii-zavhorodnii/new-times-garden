import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AchievementsModule } from '@domain/achievements/achievements.module';
import { GardensModule } from '@domain/gardens/gardens.module';
import { PlantsModule } from '@domain/plants/plants.module';
import { QuestsModule } from '@domain/quests/quests.module';

import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GardensModule,
    PlantsModule,
    AchievementsModule,
    QuestsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
