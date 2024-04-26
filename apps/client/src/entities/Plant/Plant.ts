import { Scene } from 'phaser';

export default class Plant extends Phaser.GameObjects.Sprite {
  public icon: string;
  public description: string;

  public growTime: number;
  public plantedAt: number;

  public dummy: boolean;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    title: string,
    plantedAt: number,
    growTime: number
  ) {
    super(scene, x, y, texture, title);

    this.plantedAt = plantedAt;
    this.growTime = growTime;
  }

  public preDestroy() {
    this.anims.destroy();
    this.anims = undefined;
  }
}
