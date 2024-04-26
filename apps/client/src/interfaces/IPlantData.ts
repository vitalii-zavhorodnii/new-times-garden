import { Scene } from 'phaser';

import { IGardenFetchedCell } from '@interfaces/IGardenFetched';

export interface IPlantData extends IGardenFetchedCell {
  scene?: Scene;
  x: number;
  y: number;
}

export type IPlantFieldData = Array<IPlantData | null>[];

/*

if (this.pickedSeed) {
  this.plants[rowIndex][plantIndex] = Object.create(this.pickedSeed.plant);

  const newPlant = this.plants[rowIndex][plantIndex];

  newPlant.x = x;
  newPlant.y = y;
  newPlant.activate();
  newPlant.on('pointerdown', () => {
    this.handleNewPlant(rowIndex, plantIndex, newPlant, x, y);
  });

  this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);

  // this.pickedSeed = null;
  plant.destroy();
}

*/
