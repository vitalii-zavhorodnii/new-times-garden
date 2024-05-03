import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema, now } from 'mongoose';

import { Plant } from '@domain/plants/schemas/plant.schema';

import { DEFAULT_GARDEN } from '@constants/garden.constants';

export type GardenCellDocument = HydratedDocument<GardenCell>;

@Schema({ versionKey: false, _id: false })
class GardenCell extends Document {
  @ApiProperty({ example: Plant })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Plant.name })
  readonly plant: Plant;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number })
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
    type: [[{ type: GardenCell, ref: GardenCell.name }]],
    default: DEFAULT_GARDEN
  })
  readonly field: GardenCell[][];

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const GardenSchema = SchemaFactory.createForClass(Garden);

export { Garden, GardenSchema, GardenCell, GardenCellSchema };
