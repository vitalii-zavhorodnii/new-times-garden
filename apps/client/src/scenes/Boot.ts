import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {}

  create() {
    window.scrollTo(0, 50);

    this.scene.start('Preloader');
  }
}
