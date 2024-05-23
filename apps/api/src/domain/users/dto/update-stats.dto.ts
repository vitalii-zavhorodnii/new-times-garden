import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStatsDto {
  @ApiProperty({ example: 'inc-harvests' })
  @IsOptional()
  @IsString()
  @IsIn(['inc-harvests', 'claim-achieve'])
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
