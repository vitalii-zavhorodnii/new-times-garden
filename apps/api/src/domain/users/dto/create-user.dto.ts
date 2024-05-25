import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Unique telegramId identifier'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly telegramId: string;

  @ApiProperty({
    example: 'User',
    description: 'User name'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: false,
    description: 'If false, will be disabled and unable to login'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'User avata'
  })
  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsOptional()
  readonly garden?: string;
}
