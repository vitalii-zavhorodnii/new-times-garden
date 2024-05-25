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

  @ApiProperty({ example: 'Sunflower mastery' })
  @Prop({ type: String, isRequired: true })
  readonly title: string;

  @ApiProperty({ example: 'Harvest sunflowers' })
  @Prop({ type: String, isRequired: true })
  readonly description: string;

  @ApiProperty({ example: './assets/achieve.png' })
  @Prop({ type: String })
  readonly icon: string;

  @ApiProperty({ example: 'harvest' })
  @Prop({ type: String, isRequired: true, enum: ['harvest'] })
  readonly type: 'harvest';

  @ApiProperty({ example: [50, 250, 500, 1000] })
  @Prop({ type: [Number], required: true })
  readonly steps: number[];

  @ApiProperty({ example: [50, 250, 500, 1000] })
  @Prop({ type: [Number], default: null })
  readonly coinReward: number[];

  @ApiProperty({ example: [50, 250, 500, 1000] })
  @Prop({ type: [Number], default: null })
  readonly tokenReward: number[];

  @ApiProperty({ example: [50, 250, 500, 1000] })
  @Prop({ type: [Number], default: null })
  readonly xpReward: number[];

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({ type: Plant, ref: Plant.name })
  readonly plant?: Plant;

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const AchievementSchema = SchemaFactory.createForClass(Achievement);

export { Achievement, AchievementSchema };
