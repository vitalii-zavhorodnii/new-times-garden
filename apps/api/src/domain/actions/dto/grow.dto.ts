import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GrowDto {
  @ApiProperty({ example: '9379992' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly telegramId: string;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly plantId: string;

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

  @ApiProperty({ example: 750539445 })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly plantedAtClient: number;
}
