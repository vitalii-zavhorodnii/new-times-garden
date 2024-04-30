import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ProductsModule } from '@domain/products/products.module';
import { UsersModule } from '@domain/users/users.module';

import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    ProductsModule,
    UsersModule
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
