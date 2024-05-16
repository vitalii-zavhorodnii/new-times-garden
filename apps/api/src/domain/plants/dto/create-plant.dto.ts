import { ApiProperty } from '@nestjs/swagger';

import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({
    example: './assets/plants/icons/salat.png',
    description: 'Icon for plants shop'
  })
  @IsOptional()
  @IsString()
  readonly icon?: string;

  @ApiProperty({
    example: 'Salat',
    description: 'Name of plant'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  readonly title: string;

  @ApiProperty({
    example: 'Salat',
    description: 'Name of plant'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  readonly type: string;

  @ApiProperty({
    example: 'Salat is green',
    description: 'Description of plant'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  readonly description: string;

  @ApiProperty({
    example: 'Salat is green',
    description: 'Description of plant'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  readonly texture: string;

  @ApiProperty({
    example: 90,
    description: 'Grow time'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly growTime: number;

  @ApiProperty({
    example: 90,
    description: 'Price in coins'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly gamePrice: number;

  @ApiProperty({
    example: 90,
    description: 'level in coins'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly requiredLevel: number;

  @ApiProperty({
    example: 90,
    description: 'Price in tokens'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly tokenPrice: number;

  @ApiProperty({
    example: 90,
    description: 'Amount of coins to harvest'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly coinsIncome: number;

  @ApiProperty({
    example: 30,
    description: 'Amount of tokens to harvest'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly tokensIncome: number;

  @ApiProperty({
    example: 30,
    description: 'Amount of xp to harvest'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly xpIncome: number;
}
