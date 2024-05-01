import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payment } from './schemas/payment.schema';
import { Product } from '@domain/products/schemas/product.schema';
import { User } from '@domain/users/schemas/user.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
  ) {}

  public async create(product: Product, user: User): Promise<Payment> {
    const payment = await new this.paymentModel({
      product,
      user
    }).save();
    
    return payment;
  }
}
