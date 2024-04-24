import { Controller, Get } from '@nestjs/common';

import { ROUTES } from '@constants/routes.constants'

@Controller(ROUTES.plants)
export class PlantsController {
  @Get('')
  getPlants(): Array<any> {
    const plants = [
      [
        { texture: 'grass' },
        { texture: 'soil' },
        { texture: 'plant' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
      [
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
        { texture: 'soil' },
      ],
    ];

    return plants;
  }
}
