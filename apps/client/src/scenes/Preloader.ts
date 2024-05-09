import { Scene } from 'phaser';

import { createUser } from '@services/createUser';
import { getPlantsList } from '@services/getPlantsList';
import { getSettings } from '@services/getSettings';
import { getShopItems } from '@services/getShopItems';
import { getUserData } from '@services/getUserData';

import { userGardenMapper } from '@mappers/mapUserGarden';

import { randomNumberHelper } from '@helpers/random-number';

import { LOADING_TEXTS } from '@constants/loading-texts';
import { PLANTS_SPRITES } from '@constants/plants-sprites';

import type { IUserData } from '@interfaces/IUserData';

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
    this.load.spritesheet('loader', 'assets/utils/loader-spreadsheet.png', {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 27
    });
    
  }

  create() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    const rndNumber = randomNumberHelper(0, LOADING_TEXTS.length - 1);

    this.text = this.add.text(centerX, centerY + 60, LOADING_TEXTS[rndNumber]);
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

    this.add.sprite(centerX, centerY, 'loader').play('loading');

    if (window?.Telegram) {
      let user = null;

      if (process.env.NODE_ENV === 'production') {
        user = {
          telegramId: String(window?.Telegram?.WebApp?.initDataUnsafe?.user?.id),
          name: window?.Telegram?.WebApp?.initDataUnsafe?.user?.username
        };
      }
      if (process.env.NODE_ENV === 'development') {
        user = {
          telegramId: process.env.DEFAULT_ID,
          name: 'user'
        };
      }

      if (user?.telegramId) {
        this.fetchUserData(user);
      } else {
        this.scene.start('GameOver');
      }
    }
  }

  private async fetchUserData(userData: IUserData) {
    let user = await getUserData(userData.telegramId);

    if (!user) {
      user = await createUser(userData);
    }

    user.garden.field = userGardenMapper(user.garden.field);

    const settings = await getSettings();
    const plants = await getPlantsList();
    const shopList = await getShopItems();

    clearInterval(this.timer);
    this.scene.start('Game', { user, plants, shopList, settings });
  }
}
