import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, now } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
class Product extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: './assets/img.png' })
  @Prop({ type: String, required: true })
  readonly img: string;

  @ApiProperty({ example: 2100 })
  @Prop({ type: Number, required: true })
  readonly value: number;

  @ApiProperty({ example: 25.99 })
  @Prop({ type: Number, required: true })
  readonly price: number;

  @ApiProperty({ example: 29.99 })
  @Prop({ type: Number, default: null })
  readonly oldPrice: number | null;

  @ApiProperty({ example: 4.57 })
  @Prop({ type: Number })
  readonly tonPrice: number;

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { Product, ProductSchema };
