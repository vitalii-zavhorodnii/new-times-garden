import { Scene } from 'phaser';

import Plant from 'src/entities/Plant';

export default class Seed extends Phaser.GameObjects.Sprite {
  public title: string;
  public clicked: number = 0;
  public plant: Plant;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    title: string,
    plant: Plant
  ) {
    super(scene, x, y, texture);

    this.title = title;
    this.plant = plant;
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
}
