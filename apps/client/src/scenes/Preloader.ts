import { Scene } from 'phaser';

import { createUser } from '@services/createUser';
import { getPlantsList } from '@services/getPlantsList';
import { getShopItems } from '@services/getShopItems';
import { getUserData } from '@services/getUserData';

import { userGardenMapper } from '@mappers/mapUserGarden';

import { randomNumberHelper } from '@helpers/random-number';

import { LOADING_TEXTS } from '@constants/loading-texts';

export class Preloader extends Scene {
  private timer: ReturnType<typeof setInterval>;
  private text: Phaser.GameObjects.Text;

  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.spritesheet('loader', 'assets/utils/loader-spreadsheet.png', {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 27
    });
    // background
    this.load.image('background', 'assets/utils/background.jpg');
    // decor
    this.load.image('dummy', 'assets/utils/dummy.png');
    // field tiles
    this.load.image('planted', 'assets/soil/planted.png');
    this.load.spritesheet('soil', 'assets/soil/soil-spritesheet.png', {
      frameWidth: 96,
      frameHeight: 96
    });
    // Sprites for plants
    this.load.image('potato', 'assets/plants/potato.png');
    this.load.image('corn', 'assets/plants/corn.png');
    this.load.image('berry', 'assets/plants/berry.png');
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
      const user = {
        telegramId: String(window?.Telegram?.WebApp?.initDataUnsafe?.user?.id),
        name: window?.Telegram?.WebApp?.initDataUnsafe?.user?.username
        // avatar: window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url
      };
      // const user = {
      //   telegramId: '410027537',
      //   name: 'user',
      //   avatar: 'url'
      // };

      if (user?.telegramId) {
        this.fetchUserData(user);
      } else {
        this.scene.start('GameOver');
      }
    }
  }

  private async fetchUserData(userData: any) {
    let user = await getUserData(userData.telegramId);

    if (!user) {
      user = await createUser(userData);
    }

    user.garden.field = userGardenMapper(user.garden.field);

    const plants = await getPlantsList();
    const shopList = await getShopItems();

    clearInterval(this.timer);
    this.scene.start('Game', { user, plants, shopList });
  }
}
