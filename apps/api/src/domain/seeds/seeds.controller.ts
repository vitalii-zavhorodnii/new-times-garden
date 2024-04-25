import { Public } from '@decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Response as Res
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { SeedsService } from './seeds.service';

import { Seed } from './schemas/seed.schema';

import { CreateSeedDto } from './dto/create-Seed.dto';
import { UpdateSeedDto } from './dto/update-Seed.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.seeds)
@Controller(ROUTES.seeds)
export class SeedsController {
  constructor(private readonly SeedsService: SeedsService) {}

  @ApiOperation({ summary: 'public, find all active Seeds' })
  @ApiResponse({ status: 200, type: Seed, isArray: true })
  @Public()
  @Get('')
  public async findAll(): Promise<Seed[]> {
    return await this.SeedsService.findAllActive();
  }

  @ApiOperation({ summary: 'public, get gadget by slug' })
  @ApiResponse({ status: 200, type: Seed, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Seed was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Seed> {
    const Seed = await this.SeedsService.findOneByQuery({
      slug
    });

    if (!Seed) {
      throw new NotFoundException(`Seed with slug "${slug}" was not found`);
    }

    return Seed;
  }

  // @ApiOperation({ summary: 'get all Seed data' })
  // @ApiResponse({ status: 200, type: Seed, isArray: true })
  // @Get('/all')
  // public async findAllSeeds(@Res() response: Response): Promise<void> {
  //   const result: Seed[] = await this.SeedsService.findAll();

  //   response.header('Content-Range', `Seeds ${result.length}`);
  //   response.send(result);
  // }

  // @ApiOperation({ summary: 'get Seed data by ID' })
  // @ApiResponse({ status: 200, type: Seed })
  // @ApiResponse({ status: 404, description: 'Seed was not found' })
  // @Public()
  // @Get('/:id')
  // public async findSeedById(@Param('id') id: string): Promise<Seed> {
  //   return await this.SeedsService.findOneById(id);
  // }

  @ApiOperation({ summary: 'create new Seed' })
  @ApiResponse({ status: 200, type: Seed })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createSeed(
    @Body()
    dto: CreateSeedDto
  ): Promise<Seed> {
    return await this.SeedsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Seed by ID' })
  @ApiResponse({ status: 200, type: Seed })
  @ApiResponse({
    status: 404,
    description: 'Seed was not found'
  })
  @Put('/:id')
  public async updateSeed(
    @Param('id') id: string,
    @Body()
    dto: UpdateSeedDto
  ): Promise<Seed | null> {
    return await this.SeedsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently Seed by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Seed was not found'
  })
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.SeedsService.remove(id);
  }

  @Public()
  @Get('all')
  getPlants(): Array<any> {
    const SEEDS = [
      {
        icon: './assets/seeds/blueflower.png',
        title: 'blueflower',
        growTime: 10,
        price: 10,
        tokenCost: 0,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/corn.png',
        title: 'corn',
        growTime: 10,
        cost: 20,
        plant: 'grass'
      },
      {
        icon: './assets/seeds/lily.png',
        title: 'lily',
        growTime: 10,
        cost: 30,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/sunflower.png',
        title: 'sunflower',
        growTime: 10,
        tokenCost: 40,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/tulip.png',
        title: 'tulip',
        growTime: 10,
        tokenCost: 50,
        plant: 'grass'
      },
      {
        icon: './assets/seeds/blueflower.png',
        title: 'blueflower',
        growTime: 10,
        price: 10,
        tokenCost: 0,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/corn.png',
        title: 'corn',
        growTime: 10,
        cost: 20,
        plant: 'grass'
      },
      {
        icon: './assets/seeds/lily.png',
        title: 'lily',
        growTime: 10,
        cost: 30,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/sunflower.png',
        title: 'sunflower',
        growTime: 10,
        tokenCost: 40,
        plant: 'plant'
      },
      {
        icon: './assets/seeds/tulip.png',
        title: 'tulip',
        growTime: 10,
        tokenCost: 50,
        plant: 'grass'
      }
    ];

    return SEEDS;
  }
}
