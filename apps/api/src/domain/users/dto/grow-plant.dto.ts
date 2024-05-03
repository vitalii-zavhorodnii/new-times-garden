import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GrowPlantDto {
  @ApiProperty({
    example: 'id of plant',
    description: '_id plant'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly plantId: string;

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
