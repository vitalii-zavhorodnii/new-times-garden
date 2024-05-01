import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: '64ef4383e46e72721c03090e',
    description: 'User id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty({
    example: '64ef4383e46e72721c03090e',
    description: 'Product id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @ApiProperty({
    example: '64ef4383e46e72721c03090e',
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly boc: string;
}
