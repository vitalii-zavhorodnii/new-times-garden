import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { User } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 200, type: User })
  @Post('')
  public async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const result = await this.usersService.create(dto);

    return result;
  }

  @ApiOperation({ summary: 'Find User by Telegram ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Garden was not found' })
  @Get('/:id')
  public async findUserByTelegramId(@Param('id') id: string): Promise<User | null> {
    const result = await this.usersService.findOneByTelegramId(id);

    return result;
  }
}
