import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAchievementDto {
  @ApiProperty({
    example: '64ef4383e46e72721c03090e',
    description: 'User id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly plantId: string;

  @ApiProperty({
    example: 'name',
    description: 'Product id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'title',
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'title',
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 20,
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly tokenReward: number;

  @ApiProperty({
    example: 10,
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly coinReward: number;

  @ApiProperty({
    example: 1000,
    description: 'boc transction id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly xpReward: number;
}
