import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema, now } from 'mongoose';

import { Product } from '@domain/products/schemas/product.schema';
import { User } from '@domain/users/schemas/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ versionKey: false })
class Payment extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ type: Boolean, required: true })
  @Prop({ type: Boolean })
  readonly isClosed: boolean;

  @ApiProperty({ type: Boolean, required: true })
  @Prop({ type: Boolean })
  readonly isSuccess: boolean;

  @ApiProperty({ type: Product, required: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  readonly product: Product;

  @ApiProperty({ type: User, required: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  readonly user: User;

  @Prop({ default: now() })
  readonly createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  readonly updatedAt: Date;
}

const PaymentSchema = SchemaFactory.createForClass(Payment);

export { Payment, PaymentSchema };
