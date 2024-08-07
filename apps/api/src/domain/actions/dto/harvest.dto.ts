import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HarvestDto {
  @ApiProperty({ example: '9379992' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly telegramId: string;

  @ApiProperty({ example: 2 })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly rowIndex: number;

  @ApiProperty({ example: 3 })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly plantIndex: number;
}
