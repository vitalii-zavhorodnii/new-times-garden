import { Controller, Get } from '@nestjs/common';

import { ROUTES } from '@constants/routes.constants';

@Controller(ROUTES.gardens)
export class GardensController {
  @Get('')
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
