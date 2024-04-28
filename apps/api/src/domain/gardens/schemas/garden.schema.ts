import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema, now } from 'mongoose';

import { DEFAULT_GARDEN } from '@constants/garden.constants';

export type GardenCellDocument = HydratedDocument<GardenCell>;

@Schema({ versionKey: false })
class GardenCell extends Document {
  @ApiProperty({ example: 'Potato' })
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty({ example: 'potato' })
  @Prop({ type: String, required: true })
  texture: string;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, required: true })
  growTime: number;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, required: true })
  plantedAt: number;
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

  readonly owner: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  updatedAt: Date;
}

const GardenSchema = SchemaFactory.createForClass(Garden);

export { Garden, GardenSchema, GardenCell, GardenCellSchema };
