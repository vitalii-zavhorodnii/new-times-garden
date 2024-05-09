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
    vegetables: Plant[];
    fruits: Plant[];
    berries: Plant[];
    flowers: Plant[];
  }> {
    const vegetables = await this.plantsService.findByType('vegetable');
    const fruits = await this.plantsService.findByType('fruit');
    const berries = await this.plantsService.findByType('berry');
    const flowers = await this.plantsService.findByType('flower');

    console.log({ vegetables, fruits, berries, flowers });
    return { vegetables, fruits, berries, flowers };
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

  @Public()
  @Get('all')
  getPlants(): Array<Plant> {
    const PLANTS: any[] = [
      {
        icon: './assets/plants/icons/salat.png',
        title: 'Salat',
        description: 'salat is green',
        texture: 'salat',
        growTime: 20,
        gamePrice: 20,
        tokenPrice: 0,
        coinsIncome: 40,
        tokensIncome: 0
      },
      {
        title: 'Bay leaf',
        description: 'bay leaf for borsch',
        icon: './assets/plants/icons/bay-leaf.png',
        texture: 'bay-leaf',
        growTime: 40,
        gamePrice: 90,
        tokenPrice: 0,
        coinsIncome: 130,
        tokensIncome: 0
      },
      {
        title: 'Marigold',
        description: 'shiny orange flower',
        icon: './assets/plants/icons/marigold.png',
        texture: 'marigold',
        growTime: 60,
        gamePrice: 0,
        tokenPrice: 10,
        coinsIncome: 0,
        tokensIncome: 20
      },
      {
        title: 'Berry',
        description: 'tasty berries',
        icon: './assets/plants/icons/berry.png',
        texture: 'berry',
        growTime: 60,
        gamePrice: 0,
        tokenPrice: 18,
        coinsIncome: 0,
        tokensIncome: 40
      },
      {
        icon: './assets/plants/icons/potato.png',
        title: 'Potato',
        description: 'pommes for men',
        texture: 'potato',
        growTime: 20,
        gamePrice: 500,
        tokenPrice: 0,
        coinsIncome: 40,
        tokensIncome: 0
      },
      {
        title: 'Corn',
        description: 'corn is yellow',
        icon: './assets/plants/icons/corn.png',
        texture: 'corn',
        growTime: 40,
        gamePrice: 300,
        tokenPrice: 0,
        coinsIncome: 490,
        tokensIncome: 0
      },
      {
        title: 'Berry',
        description: 'tasty berries',
        icon: './assets/plants/icons/berry.png',
        texture: 'berry',
        growTime: 60,
        gamePrice: 0,
        tokenPrice: 10,
        coinsIncome: 0,
        tokensIncome: 20
      },
      {
        title: 'Berry',
        description: 'tasty berries',
        icon: './assets/plants/icons/berry.png',
        texture: 'berry',
        growTime: 60,
        gamePrice: 0,
        tokenPrice: 18,
        coinsIncome: 0,
        tokensIncome: 40
      }
    ];

    return PLANTS;
  }
}
