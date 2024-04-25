import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type SeedDocument = HydratedDocument<Seed>;

@Schema({ versionKey: false })
class Seed extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'diagnostic' })
  @Prop({
    type: String,
    unique: true,
    set: (v: string) => v?.trim().toLowerCase(),
    required: false
  })
  readonly icon: string;

  @ApiProperty({ example: 'Diagnostic' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String, required: false })
  readonly description: string;

  @ApiProperty({ example: 10 })
  @Prop({ type: String, required: false })
  readonly price: number;

  @ApiProperty({ example: 20 })
  @Prop({ type: String, required: false })
  readonly tokenPrice: number;

  // @ApiProperty({ type: Plant })
  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Plant.name }] })
  // readonly benefits: Plant;
}

const SeedSchema = SchemaFactory.createForClass(Seed);

export { Seed, SeedSchema };
