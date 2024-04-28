import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema, now } from 'mongoose';

import { DEFAULT_GARDEN } from '@constants/garden.constants';

export type GardenCellDocument = HydratedDocument<GardenCell>;

@Schema({ versionKey: false })
class GardenCell extends Document {
  @ApiProperty({ example: 'Potato' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'potato' })
  @Prop({ type: String, required: true })
  readonly texture: string;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, required: true })
  readonly growTime: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, required: true })
  readonly plantedAt: number;
}

const GardenCellSchema = SchemaFactory.createForClass(GardenCell);

export type GardenDocument = HydratedDocument<Garden>;

@Schema({ versionKey: false })
class Garden extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ type: GardenCell, isArray: true })
  @Prop({
    type: [[{ type: MongooseSchema.Types.ObjectId, ref: GardenCell.name }]],
    default: DEFAULT_GARDEN
  })
  readonly field: Array<GardenCell | null>[];

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const GardenSchema = SchemaFactory.createForClass(Garden);

export { Garden, GardenSchema, GardenCell, GardenCellSchema };
