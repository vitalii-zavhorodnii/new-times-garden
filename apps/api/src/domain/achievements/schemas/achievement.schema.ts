import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, now } from 'mongoose';

import { Plant } from '@domain/plants/schemas/plant.schema';

export type AchievementDocument = HydratedDocument<Achievement>;

@Schema({ versionKey: false })
class Achievement extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 90 })
  @Prop({ type: Plant, ref: Plant.name })
  readonly plant: Plant;

  @ApiProperty({ example: 'harvest' })
  @Prop({ type: String, isRequired: true })
  readonly name: string;

  @ApiProperty({ example: 'harvest' })
  @Prop({ type: String, isRequired: true })
  readonly type: 'harvest' | 'badge';

  @ApiProperty({ example: 'Harvest-o-matic' })
  @Prop({ type: String })
  readonly title: string;

  @ApiProperty({ example: './assets/achieve.png' })
  @Prop({ type: String })
  readonly icon: string;

  @ApiProperty({ example: 'achievement-texture' })
  @Prop({ type: String })
  readonly texture: string;

  @ApiProperty({ example: 'Harvest 6 crops' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly tokenReward: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly coinReward: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
  readonly xpReward: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: [Number] })
  readonly steps: number[];

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const AchievementSchema = SchemaFactory.createForClass(Achievement);

export { Achievement, AchievementSchema };
