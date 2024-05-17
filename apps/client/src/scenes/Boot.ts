import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {}

  create() {
    window.scrollTo(0, 1);

    this.scene.start('Preloader');
  }
}
