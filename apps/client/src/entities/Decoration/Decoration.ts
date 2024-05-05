import { Scene } from 'phaser';

export default class Decration extends Phaser.GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number, texture: string, scale: number) {
    super(scene, x, y, texture);

    this.scale = scale;
  }
}
