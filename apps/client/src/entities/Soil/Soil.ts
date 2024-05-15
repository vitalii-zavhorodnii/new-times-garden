import { Scene } from 'phaser';

import Plant from '@entities/Plant';

import { CONTAINERS_DEPTH } from '@constants/containers-depth';

export default class Soil extends Phaser.GameObjects.Sprite {
  public isOccupied: boolean;
  public plant: Plant;

  public poofSprite: Phaser.GameObjects.Sprite;
  public poofContainer: Phaser.GameObjects.Container;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'soil');

    this.isOccupied = false;
  }

  public placePlant(plant: Plant) {
    if (plant?.dummy) {
      this.isOccupied = false;
      this.setTexture('harvested');
    }

    if (plant.growTime) {
      this.isOccupied = true;
      this.setTexture('planted');
    }

    this.plant = plant;
  }
}
