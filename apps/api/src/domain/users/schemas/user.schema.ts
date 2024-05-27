import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Achievement } from '@domain/achievements/schemas/achievement.schema';
import { Garden } from '@domain/gardens/schemas/garden.schema';
import { Quest } from '@domain/quests/schemas/quest.schema';

@Schema({ versionKey: false, _id: false })
class UserQuest {
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
class UserAchieve {
  @ApiProperty({ example: Achievement })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Achievement.name })
  readonly achievement: Achievement;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly progress: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly onStep: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly isCompleted: boolean;
}

@Schema({ versionKey: false, _id: false })
class UserStats {
  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly harvested: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly achievements: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, default: 0 })
  readonly achievePoints: number;
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
  @Prop({ type: Number, default: 0 })
  readonly balanceCoins: number;

  @ApiProperty({ example: 100 })
  @Prop({ type: Number, default: 0 })
  readonly balanceTokens: number;

  @ApiProperty({ example: 100 })
  @Prop({ type: Number, default: 0 })
  readonly xp: number;

  @ApiProperty({ example: 100 })
  @Prop({ type: Number, default: 0 })
  readonly playerLevel: number;

  @ApiProperty({ type: UserStats })
  @Prop({ type: UserStats })
  readonly stats: UserStats;

  @ApiProperty({ type: Garden })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Garden.name })
  readonly garden: Garden;

  @ApiProperty({ example: [UserQuest] })
  @Prop({ type: [{ type: UserQuest }] })
  readonly quests: UserQuest[];

  @ApiProperty({ example: [UserAchieve] })
  @Prop({
    type: [{ type: UserAchieve }],
    default: []
  })
  readonly achievements: UserAchieve[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
