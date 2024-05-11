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

  preload() {
    /* 
          Loadingscreen
      */
    this.load.spritesheet('loader', 'assets/utils/loader.png', {
      frameWidth: 200,
      frameHeight: 200
    });
  }

  create() {
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

    console.log('EventBus initialize');
    EventBus.on('initialize-data-fetch', (data: any) => {
      console.log('initialization emmited');
      this.scene.start('Game', data);
    });
  }
}
