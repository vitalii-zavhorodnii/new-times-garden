import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class HarvestPlantDto {
  @ApiProperty({
    example: 2
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly rowIndex: number;

  @ApiProperty({
    example: 3
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly plantIndex: number;
}
