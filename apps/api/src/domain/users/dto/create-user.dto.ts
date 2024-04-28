import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: false,
    description: 'If false, will be disabled and unable to login'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'Admin',
    description: 'Unique telegramId identifier'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly telegramId: number;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'User avata'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly avatar: string;

  @ApiProperty({
    example: 'User',
    description: 'User name'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsOptional()
  @IsString()
  readonly garden: string;
}
