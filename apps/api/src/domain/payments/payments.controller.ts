import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaymentsService } from './payments.service';
import { ProductsService } from '@domain/products/products.service';
import { UsersService } from '@domain/users/users.service';

import { Payment } from './schemas/payment.schema';

import { CreatePaymentDto } from './dto/create-payment.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.payments)
@Controller(ROUTES.payments)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'create new Payment' })
  @ApiResponse({ status: 200, type: Payment })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Post('')
  public async createPayment(
    @Body()
    dto: CreatePaymentDto
  ): Promise<Payment> {
    console.log({ dto });
    const product = await this.productsService.findById(dto.productId);
    const user = await this.usersService.findOneByTelegramId(dto.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ID - ${user.telegramId} was not found!`
      );
    }

    const payment = await this.paymentsService.create(product, user, dto.boc);

    const updatedValue = user.balanceTokens + product.value;
    this.usersService.updateUserTokens(user._id, updatedValue);

    return payment;
  }
}
