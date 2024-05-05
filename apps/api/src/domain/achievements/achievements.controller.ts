import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AchievementsService } from './achievements.service';

import { Achievement } from './schemas/achievement.schema';

import { CreateAchievementDto } from './dto/create-achievement.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.achievements)
@Controller(ROUTES.achievements)
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @ApiOperation({ summary: 'create new Payment' })
  @ApiResponse({ status: 200, type: Achievement })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Public()
  @Post('')
  public async createPayment(
    @Body()
    dto: CreateAchievementDto
  ): Promise<Achievement> {
    const achievement = await this.achievementsService.create(dto);

    return achievement;
  }
}
