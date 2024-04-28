import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Exclude } from 'class-transformer';

import { Garden } from 'domain/gardens/schemas/garden.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
class User extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 'telegramId' })
  @Prop({ type: String, required: true, unique: true })
  readonly telegramId: string;

  @ApiProperty({ example: 'name' })
  @Prop({ type: String })
  readonly name: string;

  @ApiProperty({ example: 'avatar' })
  @Prop({ type: String })
  readonly avatar: string;

  @ApiProperty({ example: 100 })
  @Prop({
    type: Number,
    default: 0
  })
  readonly balanceCoins: number;

  @ApiProperty({ example: 100 })
  @Prop({
    type: Number,
    default: 0
  })
  readonly balanceTokens: number;

  @ApiProperty({ type: Garden })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Garden.name })
  readonly garden: Garden;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
