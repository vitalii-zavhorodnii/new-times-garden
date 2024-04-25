import { Scene } from 'phaser';

import Plant from '@entities/Plant';

export default class Soil extends Phaser.GameObjects.Sprite {
  public isOccupied: boolean;
  public plant: Plant;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.isOccupied = false;
  }

  public placePlant(plant: Plant) {
    this.isOccupied = true;
    this.setTexture('planted');
    this.plant = plant;
  }
}
