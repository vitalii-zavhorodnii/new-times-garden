import { Controller, Get } from '@nestjs/common';

import { sendTxById } from '@bot/commands-handlers';

import { ROUTES } from '@constants/routes.constants';

//410027537
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
