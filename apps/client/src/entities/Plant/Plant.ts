import { Scene } from 'phaser';

import Seed from '@entities/Seed';

export default class Plant extends Phaser.GameObjects.Sprite {
  public growTime: number;
  public cost: number;
  public tokenCost: number;
  public clicked: number = 0;
  public dummy: boolean;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }

  public activate() {
    // this.setInteractive();
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
