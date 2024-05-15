import { Scene } from 'phaser';

export default class Dummy extends Phaser.GameObjects.Sprite {
  public dummy: boolean;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'dummy');

    this.scale = 0.45;
    this.dummy = true;
  }
}
