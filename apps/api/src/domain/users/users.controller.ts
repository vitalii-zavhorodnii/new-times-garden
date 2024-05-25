import { Public } from '@decorators/public.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { AchievementsService } from '@domain/achievements/achievements.service';
import { GardensService } from '@domain/gardens/gardens.service';
import { PlantsService } from '@domain/plants/plants.service';
import { QuestsService } from '@domain/quests/quests.service';

import { User } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly gardendsService: GardensService,
    private readonly plantsService: PlantsService,
    private readonly achievementsService: AchievementsService
  ) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 200, type: User })
  @Post('')
  public async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const garden = await this.gardendsService.create();
    const achievementsList = await this.achievementsService.findActive();

    const achievements = achievementsList.map((achieve) => ({
      achievement: achieve._id
    }));

    if (!garden) {
      throw new BadRequestException('Garden creation error');
    }

    const result = await this.usersService.create({ ...dto }, garden, achievements);

    return result;
  }

  @ApiOperation({ summary: 'Find User by Telegram ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Garden was not found' })
  @Get('/:id')
  public async findUserByTelegramId(@Param('id') id: string): Promise<User | null> {
    const user = await this.usersService.findOneByTelegramId(id);

    if (!user) {
      return null;
    }

    const plants = await this.plantsService.findAll();

    if (plants.length === 0) {
      throw new BadRequestException('Plants was not found!');
    }

    const result: any = JSON.parse(JSON.stringify(user));

    const field = result.garden.field.map((row) => {
      return row.map((cell) => {
        if (!cell) {
          return null;
        }

        const foundPlant = plants.find((item) => `${item._id}` === `${cell.plant}`);

        return { ...cell, plant: foundPlant };
      });
    });

    result.garden.field = field;

    return result as User;
  }

  @ApiOperation({ summary: 'create new Achievement' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Post('/bind-bulk')
  public async bindToUserBulkAchievements(): Promise<void> {
    const achievements = await this.achievementsService.findActive();
    const users = await this.usersService.findAll();

    users.forEach((user) => {
      achievements.forEach((achieve) => {
        this.usersService.addAchievement(user._id, achieve._id);
      });
    });
  }
}
