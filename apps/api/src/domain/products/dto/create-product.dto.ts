import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    example: './assets/img.png',
    description: 'Product image on frontend'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly img: string;

  @ApiProperty({
    example: 2100,
    description: 'Amount of tokens to buy'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly value: number;

  @ApiProperty({
    example: 25.99,
    description: 'Price of product'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 29.99,
    description: 'Old price if sale'
  })
  @IsOptional()
  @IsNumber()
  readonly oldPrice: number;
}
