import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GardensService } from './gardens.service';

import { Garden } from './schemas/garden.schema';

import { UpdateGardenDto } from './dto/update-garden.dto';

import { ROUTES } from '@constants/routes.constants';

//410027537
@ApiTags(ROUTES.gardens)
@Controller(ROUTES.gardens)
export class GardensController {
  constructor(private readonly gardensService: GardensService) {}

  @ApiOperation({ summary: 'Get garden data by user ID' })
  @ApiResponse({ status: 200, type: Garden })
  @ApiResponse({ status: 404, description: 'Garden was not found' })
  @Get('/:id')
  public async findGardenById(@Param('id') id: string): Promise<Garden> {
    return await this.gardensService.findOneById(id);
  }

  @ApiOperation({ summary: 'update existing issue by ID' })
  @ApiResponse({ status: 200, type: Garden })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Put('/:id')
  public async updateIssue(
    @Param('id') id: string,
    @Body()
    dto: UpdateGardenDto
  ): Promise<Garden> {
    return await this.gardensService.update(id, dto);
  }

  @Get('/test')
  getPlants(): Array<any>[] {
    const plants = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [
        null,
        null,
        null,
        null,
        {
          title: 'Potato',
          growTime: 20,
          plantedAt: 1,
          texture: 'potato'
        }
      ]
    ];

    return plants;
  }
}
