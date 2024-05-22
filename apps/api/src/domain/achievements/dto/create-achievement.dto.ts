import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

import { Plant } from '@domain/plants/schemas/plant.schema';

export class CreateAchievementDto {
  @ApiProperty({ example: 'Sunflower mastery' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Harvest sunflowers' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: './assets/achieve.png' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly icon: string;

  @ApiProperty({ example: 'harvest' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(['harvest'])
  readonly type: string;

  @ApiProperty({ example: [50, 200, 1000] })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  readonly steps: number[];

  @ApiProperty({ example: 20 })
  @Optional()
  @IsNumber()
  readonly coinReward?: number;

  @ApiProperty({ example: 30 })
  @Optional()
  @IsNumber()
  readonly tokenReward?: number;

  @ApiProperty({ example: 10 })
  @Optional()
  @IsNumber()
  readonly xpReward?: number;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Optional()
  @IsString()
  readonly plantId?: string;

  @Optional()
  readonly plant: Plant;
}
