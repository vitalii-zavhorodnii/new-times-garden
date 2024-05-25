import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AchievementsService } from './achievements.service';
import { PlantsService } from '@domain/plants/plants.service';

import { Achievement } from './schemas/achievement.schema';

import { CreateAchievementDto } from './dto/create-achievement.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.achievements)
@Controller(ROUTES.achievements)
export class AchievementsController {
  constructor(
    private readonly achievementsService: AchievementsService,
    private readonly plantsService: PlantsService
  ) {}

  @ApiOperation({ summary: 'Find all achievements' })
  @ApiResponse({ status: 200, type: Achievement })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Get('')
  public async findActiveAchievements(): Promise<Achievement[]> {
    const achievements = await this.achievementsService.findActive();

    return achievements;
  }

  @ApiOperation({ summary: 'create new Achievement' })
  @ApiResponse({ status: 200, type: Achievement })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Post('')
  public async createAchievement(
    @Body()
    dto: CreateAchievementDto
  ): Promise<Achievement> {
    const plant = await this.plantsService.findOneById(dto.plantId);

    if (!plant) throw new NotFoundException();

    const achievement = await this.achievementsService.create({ ...dto, plant });

    return achievement;
  }

  @ApiOperation({ summary: 'create new Achievement' })
  @ApiResponse({ status: 200, type: Achievement })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Post('/create-bulk')
  public async addBulkAchievements(): Promise<void> {
    const plants = await this.plantsService.findAll();

    const achievements = plants.map((plant) => {
      this.achievementsService.create({
        title: `${plant.title} mastery`,
        description: `Harvest ${plant.title.toLowerCase()} plants`,
        icon: `${plant.texture}.png`,
        type: 'harvest',
        steps: [50, 250, 500, 1000],
        xpReward: [100, 100, 100, 100],
        plant: plant
      });
    });
  }
}
