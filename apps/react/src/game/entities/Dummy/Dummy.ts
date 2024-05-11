import { Scene } from 'phaser';

export default class Dummy extends Phaser.GameObjects.Sprite {
  public dummy: boolean;
  constructor(scene: Scene) {
    super(scene, 900, 0, 'dummy');
    this.dummy = true;
  }
}
