import { Scene } from 'phaser';

import Plant from '@entities/Plant';

export default class Soil extends Phaser.GameObjects.Sprite {
  public isOccupied: boolean;
  public plant: Plant;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'soil');

    this.isOccupied = false;
  }

  public placePlant(plant: Plant): void {
    if (plant?.dummy) {
      this.isOccupied = false;
      this.setTexture('harvested');
    }

    if (plant.growTime) {
      this.isOccupied = true;
      this.setTexture('harvested');
    }

    this.plant = plant;
  }
}