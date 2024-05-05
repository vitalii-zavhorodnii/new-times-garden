import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Garden } from '@domain/gardens/schemas/garden.schema';
import { Quest } from 'domain/quests/schemas/quest.schema';

@Schema({ versionKey: false, _id: false })
class UserQuest extends Document {
  @ApiProperty({ example: [Quest] })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Quest.name })
  readonly quest: Quest;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly goal: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly progress: number;
}

@Schema({ versionKey: false, _id: false })
class DailyQuestLog extends Document {
  @ApiProperty({ example: [UserQuest] })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: UserQuest.name }] })
  readonly todo: UserQuest[];

  @ApiProperty({ example: [UserQuest] })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: UserQuest.name }] })
  readonly completed: UserQuest[];

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly completeCount: number;
}

@Schema({ versionKey: false, _id: false })
class MainQuestLog extends Document {
  @ApiProperty({ example: [UserQuest] })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: UserQuest.name }] })
  readonly todo: UserQuest[];

  @ApiProperty({ example: [UserQuest] })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: UserQuest.name }] })
  readonly completed: UserQuest[];

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly completeCount: number;
}

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
class User extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 'telegramId' })
  @Prop({ type: String, required: true, unique: true })
  readonly telegramId: string;

  @ApiProperty({ example: 'name' })
  @Prop({ type: String })
  readonly name: string;

  @ApiProperty({ example: 'avatar' })
  @Prop({ type: String })
  readonly avatar: string;

  @ApiProperty({ example: 100 })
  @Prop({
    type: Number,
    default: 0
  })
  readonly balanceCoins: number;

  @ApiProperty({ example: 100 })
  @Prop({
    type: Number,
    default: 0
  })
  readonly balanceTokens: number;

  @ApiProperty({ example: 100 })
  @Prop({
    type: Number,
    default: 0
  })
  readonly xp: number;

  @ApiProperty({ type: Garden })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Garden.name })
  readonly garden: Garden;

  @ApiProperty({ type: DailyQuestLog })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DailyQuestLog.name })
  readonly dailyQuests: DailyQuestLog;

  @ApiProperty({ type: MainQuestLog })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: MainQuestLog.name })
  readonly mainQuests: MainQuestLog;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
