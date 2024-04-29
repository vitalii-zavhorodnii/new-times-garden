import { Scene } from 'phaser';

import { createUser } from '@services/createUser';
import { getPlantsList } from '@services/getPlantsList';
import { getUserData } from '@services/getUserData';

import { userGardenMapper } from '@mappers/mapUserGarden';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    this.add.rectangle(centerX, centerY, 120, 20).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(centerX - 230, 384, 4, 28, 0xffffff);
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath('assets');
  }
  // 410027537
  create() {
    if (window?.Telegram) {
      const user = {
        telegramId: String(window?.Telegram?.WebApp?.initDataUnsafe?.user?.id),
        name: window?.Telegram?.WebApp?.initDataUnsafe?.user?.username,
        // avatar: window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url
      };
      // const user = {
      //   telegramId: '410027537',
      //   name: 'user',
      //   avatar: 'url'
      // };
      const d = document.querySelector('.seed-picked');
      d.innerHTML = `${String(user.telegramId)} ${user.name} `;

      if (user.telegramId) {
        this.fetchUserData(user);
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

    this.scene.start('Game', { user, plants });
  }
}
