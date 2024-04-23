import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
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
