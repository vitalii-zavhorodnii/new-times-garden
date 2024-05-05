import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GardensService } from '@domain/gardens/gardens.service';
import { PlantsService } from '@domain/plants/plants.service';
import { QuestsService } from '@domain/quests/quests.service';

import { User } from './schemas/user.schema';
import type { GardenCell } from '@domain/gardens/schemas/garden.schema';

import { calculateReadyHelper } from '@helpers/calculate-ready.helper';

import { CreateUserDto } from './dto/create-user.dto';
import { GrowPlantDto } from './dto/grow-plant.dto';
import { HarvestPlantDto } from './dto/harvest-plant.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly gardendsService: GardensService,
    private readonly plantsService: PlantsService
  ) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 200, type: User })
  @Post('')
  public async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const garden = await this.gardendsService.create();

    if (!garden) {
      throw new BadRequestException('Garden creation error');
    }

    const result = await this.usersService.create({ ...dto }, garden);

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

  @ApiOperation({ summary: 'Start growing' })
  @ApiResponse({ status: 200, type: User })
  @Post('/:id/start-grow')
  public async startGrowPlant(
    @Param('id') id: string,
    @Body() dto: GrowPlantDto
  ): Promise<boolean> {
    const user = await this.usersService.findOneByTelegramId(id);
    const plant = await this.plantsService.findOneById(dto.plantId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    if (
      plant.gamePrice > user.balanceCoins ||
      plant.tokenPrice > user.balanceTokens
    ) {
      return false;
    }

    if (plant.gamePrice > 0) {
      const balance = user.balanceCoins - plant.gamePrice;
      await this.usersService.updateUserCoins(user._id, balance);
    }
    if (plant.tokenPrice > 0) {
      const balance = user.balanceTokens - plant.tokenPrice;
      await this.usersService.updateUserTokens(user._id, balance);
    }

    await this.gardendsService.updatePlant(
      user.garden._id,
      dto.rowIndex,
      dto.plantIndex,
      dto.plantedAtClient,
      plant
    );

    return true;
  }

  @ApiOperation({ summary: 'Start harvesting' })
  @ApiResponse({ status: 200, type: User })
  @Post('/:id/harvest')
  public async harvestPlant(
    @Param('id') id: string,
    @Body() dto: HarvestPlantDto
  ): Promise<boolean> {
    const user = await this.usersService.findOneByTelegramId(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const gardenData = await this.gardendsService.findOneById(user.garden._id);

    const cell = gardenData.field[dto.rowIndex][dto.plantIndex];

    if (!cell?.plantedAt) {
      return false;
    }

    const plantId = gardenData.field[dto.rowIndex][dto.plantIndex].plant._id;
    const plant = await this.plantsService.findOneById(plantId);

    const isReady = calculateReadyHelper(cell.plantedAt, plant.growTime);

    if (!isReady) {
      return false;
    }

    if (plant.coinsIncome) {
      const balance = user.balanceCoins + plant.coinsIncome;
      await this.usersService.updateUserCoins(user._id, balance);
    }
    if (plant.tokensIncome) {
      const balance = user.balanceTokens + plant.tokensIncome;
      await this.usersService.updateUserTokens(user._id, balance);
    }

    await this.gardendsService.removePlant(
      user.garden._id,
      dto.rowIndex,
      dto.plantIndex
    );

    return true;
  }
}
