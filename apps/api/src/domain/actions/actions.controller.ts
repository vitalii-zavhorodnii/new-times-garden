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

import { AchievementsService } from '@domain/achievements/achievements.service';
import { GardensService } from '@domain/gardens/gardens.service';
import { PlantsService } from '@domain/plants/plants.service';
import { UsersService } from '@domain/users/users.service';

import { calculateReadyHelper } from '@helpers/calculate-ready.helper';

import { ClaimAchieveDto } from './dto/claim-achieve.dto';
import { GrowDto } from './dto/grow.dto';
import { HarvestDto } from './dto/harvest.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.actions)
@Controller(ROUTES.actions)
export class ActionsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly gardendsService: GardensService,
    private readonly plantsService: PlantsService,
    private readonly achievementsService: AchievementsService
  ) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 200 })
  @Post('/harvest')
  public async createUser(@Body() dto: HarvestDto): Promise<boolean> {
    const user = await this.usersService.findOneByTelegramId(dto.telegramId);
    if (!user) throw new NotFoundException('user not found');

    const garden = await this.gardendsService.findOneById(user.garden._id);
    if (!garden) throw new NotFoundException('garden not found');

    const harvestingCell = garden.field[dto.rowIndex][dto.plantIndex];
    if (!harvestingCell?.plantedAt) return false;

    const plantId = harvestingCell.plant._id;
    const plant = await this.plantsService.findOneById(plantId);

    const isReady = calculateReadyHelper(harvestingCell.plantedAt, plant.growTime);

    if (!isReady) return false;
    // Updating user account
    if (plant.coinsIncome) {
      const balance = user.balanceCoins + plant.coinsIncome;
      await this.usersService.updateUserCoins(user._id, balance);
    }
    if (plant.tokensIncome) {
      const balance = user.balanceTokens + plant.tokensIncome;
      await this.usersService.updateUserTokens(user._id, balance);
    }
    if (plant.xpIncome) {
      await this.usersService.updateUserXp(user._id, plant.xpIncome);
    }
    // Update user statistics
    this.usersService.updateUserStatistic(dto.telegramId, {
      action: 'inc-harvests'
    });
    // Update user achievement
    this.usersService.updateUserAchieve(dto.telegramId, {
      action: 'mastery',
      plantId: plant._id
    });

    await this.gardendsService.removePlant(
      user.garden._id,
      dto.rowIndex,
      dto.plantIndex
    );

    return true;
  }

  @ApiOperation({ summary: 'Start growing' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/grow')
  public async startGrowPlant(@Body() dto: GrowDto): Promise<boolean> {
    const user = await this.usersService.findOneByTelegramId(dto.telegramId);
    if (!user) throw new NotFoundException('user not found');

    const plant = await this.plantsService.findOneById(dto.plantId);
    if (!plant) throw new NotFoundException('plant not found');

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

  @ApiOperation({ summary: 'Claim achievement' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/claim-achieve')
  public async claimAchievement(dto: ClaimAchieveDto): Promise<boolean> {
    const user = await this.usersService.findOneByTelegramId(dto.telegramId);
    if (!user) throw new NotFoundException('user not found');

    const achievement = await this.achievementsService.findById(dto.achievementId);
    if (!achievement) throw new NotFoundException('achievement not found');

    // const isUpdated = await this.usersService.updateUserStatistic(
    //   dto.telegramId,
    //   dto.achievementId
    // );

    // if (!isUpdated) return false;

    return true;
  }

  @ApiOperation({ summary: 'Start harvesting' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/:id/test')
  public async testAchieve(
    @Param('id') id: string,
    @Query('achieve') achieve: string
  ): Promise<any> {
    const user = await this.usersService.findOneByTelegramId(id);

    if (!user) throw new NotFoundException('User not found');

    const upd = await this.usersService.addAchievement(user._id, achieve);

    return upd;
  }

  @ApiOperation({ summary: 'Start harvesting' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/:id/complete-achievement/:achieve-id')
  public async completeAchieve(
    @Param('id') id: string,
    @Param('achieve-id') achId: string
  ): Promise<boolean> {
    if (!achId) return null;

    const user = await this.usersService.findOneByTelegramId(id);

    if (!user) throw new NotFoundException('User not found');

    return true;
  }
}
