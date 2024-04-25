import { Controller, Get } from '@nestjs/common';

import { ROUTES } from '@constants/routes.constants';

@Controller(ROUTES.plants)
export class PlantsController {
  @Get('')
  getPlants(): Array<any> {
    const plants = [
      [null, null, null, null, null],
      [
        { texture: 'bush' },
        null,
        { texture: 'bush' },
        { texture: 'bush' },
        { texture: 'bush' }
      ],
      [{ texture: 'bush' }, { texture: 'bush' }, null, null, { texture: 'bush' }],
      [{ texture: 'bush' }, null, null, { texture: 'bush' }, null],
      [null, null, null, null, null]
    ];

    return plants;
  }
}
