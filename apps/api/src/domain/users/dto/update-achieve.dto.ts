import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAchieveDto {
  @ApiProperty({ example: 'harvests' })
  @IsOptional()
  @IsString()
  @IsIn(['mastery'])
  readonly action?: string;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsOptional()
  @IsString()
  readonly achievementId?: string;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsOptional()
  @IsString()
  readonly plantId?: string;
}
