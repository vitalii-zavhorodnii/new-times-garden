import { Scene } from 'phaser';

import { getUserGarden } from '@services/getUserGarden';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    console.log({ init: 'Data' });
    //  We loaded this image in our Boot Scene, so we can display it here

    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(centerX, centerY, 120, 20).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(centerX - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.

    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

    if (userId) {
      this.fetchUserGarden(userId);
    }

    // this.scene.start('Game');
  }

  private async fetchUserGarden(id: number) {
    const garden = await getUserGarden(id);

    console.log(garden);
  }
}
