import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<Plant>;

@Schema({ versionKey: false })
class Plant extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 'assets/plants/bush.png' })
  @Prop({
    type: String,
    unique: true,
    set: (v: string) => v?.trim().toLowerCase(),
    required: false
  })
  readonly icon: string;

  @ApiProperty({ example: 'Potato' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'potato' })
  @Prop({ type: String, required: true })
  readonly texture: string;

  @ApiProperty({ example: 90 })
  @Prop({ type: Number, required: true })
  readonly growTime: number;

  @ApiProperty({ example: 10 })
  @Prop({ type: Number, required: true })
  readonly gamePrice: number;

  @ApiProperty({ example: 20 })
  @Prop({ type: Number, required: true })
  readonly tokenPrice: number;

  @ApiProperty({ example: 'Pommes for men...' })
  @Prop({ type: String, required: false })
  readonly description: string;
}

const PlantSchema = SchemaFactory.createForClass(Plant);

export { Plant, PlantSchema };
