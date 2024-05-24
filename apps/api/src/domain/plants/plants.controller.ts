import { Public } from '@decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PlantsService } from './plants.service';

import { Plant } from './schemas/plant.schema';

import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.plants)
@Controller(ROUTES.plants)
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @ApiOperation({ summary: 'public, find all active Plants' })
  @ApiResponse({ status: 200, type: Plant, isArray: true })
  @Public()
  @Get('')
  public async findAllActive(): Promise<{
    simple: Plant[];
    advanced: Plant[];
    special: Plant[];
  }> {
    const simple = await this.plantsService.findByType('simple');
    const advanced = await this.plantsService.findByType('advanced');
    const special = await this.plantsService.findByType('special');

    return { simple, advanced, special };
  }

  @ApiOperation({ summary: 'create new Plant' })
  @ApiResponse({ status: 200, type: Plant })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createPlant(
    @Body()
    dto: CreatePlantDto
  ): Promise<Plant> {
    return await this.plantsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Plant by ID' })
  @ApiResponse({ status: 200, type: Plant })
  @ApiResponse({
    status: 404,
    description: 'Plant was not found'
  })
  @Put('/:id')
  public async updatePlant(
    @Param('id') id: string,
    @Body()
    dto: UpdatePlantDto
  ): Promise<Plant | null> {
    return await this.plantsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently Plant by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Plant was not found'
  })
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.plantsService.remove(id);
  }

  @Post('/update-plants')
  public async updateUtilPlants(): Promise<void> {
    await this.plantsService.updateUtil();
  }
}
