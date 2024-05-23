import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ClaimAchieveDto {
  @ApiProperty({ example: '9379992' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly telegramId: string;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly achievementId: string;
}
