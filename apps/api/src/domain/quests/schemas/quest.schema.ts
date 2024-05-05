import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, now } from 'mongoose';

export type QuestDocument = HydratedDocument<Quest>;

@Schema({ versionKey: false })
class Quest extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 'Harvest-o-matic' })
  @Prop({ type: String })
  readonly title: string;

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

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const QuestSchema = SchemaFactory.createForClass(Quest);

export { Quest, QuestSchema };
