import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

import { Quest, QuestSchema } from './schemas/quest.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quest.name, schema: QuestSchema }])],
  providers: [QuestsService],
  controllers: [QuestsController],
  exports: [QuestsService]
})
export class QuestsModule {}
