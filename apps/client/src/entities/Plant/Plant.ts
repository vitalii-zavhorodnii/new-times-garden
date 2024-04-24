import { Scene } from 'phaser';

import Seed from 'src/entities/Seed';

export default class Plant extends Phaser.GameObjects.Sprite {
  public clicked: number = 0;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }

  public activate() {
    this.setInteractive();
  }

  public interract() {
    this.clicked++;
  }

  public preDestroy() {
    this.anims.destroy();
    this.anims = undefined;
  }

  public changePlant(seed: Seed) {
    this.texture = seed.plant.texture;
  }
}
