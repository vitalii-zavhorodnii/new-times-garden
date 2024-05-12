import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

import { randomNumberHelper } from '@helpers/random-number';

import { LOADING_TEXTS } from '@constants/loading-texts';
import { PLANTS_SPRITES } from '@constants/plants-sprites';

export class Preloader extends Scene {
  private timer: ReturnType<typeof setInterval>;
  private text: Phaser.GameObjects.Text;

  constructor() {
    super('Preloader');
  }

  public preload(): void {
    /* 
          Loadingscreen
      */
    this.load.spritesheet('loader', 'assets/utils/loader.png', {
      frameWidth: 200,
      frameHeight: 200
    });
    /*
          Game assets
      */
    // background
    this.load.image('background', 'assets/decorations/background.png');
    this.load.image('house', 'assets/decorations/house.png');
    // utils
    this.load.image('dummy', 'assets/utils/dummy.png');
    // field tiles
    this.load.image('planted', 'assets/soil/planted.png');
    this.load.image('harvested', 'assets/soil/harvested.png');
    this.load.spritesheet('soil', 'assets/soil/soil-spritesheet.png', {
      frameWidth: 96,
      frameHeight: 96
    });
    // Sprites for plants
    PLANTS_SPRITES.forEach((sprite: string) => {
      this.load.spritesheet(sprite, `assets/plants/${sprite}.png`, {
        frameWidth: 96,
        frameHeight: 96
      });
    });
  }

  public create(): void {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    const rndNumber = randomNumberHelper(0, LOADING_TEXTS.length - 1);

    this.text = this.add.text(centerX, centerY + 70, LOADING_TEXTS[rndNumber]);
    this.text.setOrigin(0.5, 0.5);

    this.timer = setInterval(() => {
      const rndNumber = randomNumberHelper(0, LOADING_TEXTS.length - 1);

      this.text.setText(LOADING_TEXTS[rndNumber]);
    }, 1200);

    this.anims.create({
      key: 'loading',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('loader', { start: 5, end: 10 }),
      repeat: -1
    });

    const loader = this.add.sprite(centerX, centerY, 'loader').play('loading');
    loader.setScale(0.4);

    EventBus.on('initialize-data-fetch', (data: any) => {
      clearInterval(this.timer);

      this.scene.start('Game', data);
    });
  }
}
