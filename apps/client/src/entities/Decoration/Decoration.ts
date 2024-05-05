import { Scene } from 'phaser';

export default class Decration extends Phaser.GameObjects.Sprite {
  public decorationName: string;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    decorationName: string,
    scale: number
  ) {
    super(scene, x, y, texture);

    this.scale = scale;
    this.decorationName = decorationName;
  }

  public interract(callback: Function) {
    callback();
  }
}
