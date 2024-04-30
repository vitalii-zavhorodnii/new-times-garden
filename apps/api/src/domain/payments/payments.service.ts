import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payment } from './schemas/payment.schema';

import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
  ) {}

  public async create(dto: CreatePaymentDto): Promise<Payment> {
    const payment = await new this.paymentModel(dto).save();

    return payment;
  }
}
