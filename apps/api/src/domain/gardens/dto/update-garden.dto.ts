import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
  validate
} from 'class-validator';

class GardenCellDto {
  @IsString()
  title: string;

  @IsString()
  texture: string;

  @IsNumber()
  growTime: number;

  @IsNumber()
  plantedAt: number;
}

async function validateRowArray(input: (GardenCellDto | null)[]): Promise<boolean> {
  const validityArray = await Promise.all(
    input.map(async (rowGarden) => {
      const errors = await validate(rowGarden); // you could also use validate('Student', student);

      if (errors.length === 0) {
        return true;
      } else {
        return false;
      }
    })
  );

  const result = validityArray.reduce<boolean>(
    (isValid, currentValue) => isValid && currentValue,
    true
  );

  return result;
}

export class UpdateGardenDto {
  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'Diagnostic...',
    description: 'Garden fields'
  })
  @IsArray({ each: true })
  @Validate(validateRowArray, { each: true })
  readonly field: (GardenCellDto | null)[][];
}
