import { Scene } from 'phaser';

import { IGardenFetchedCell } from '@interfaces/IGardenFetched';

export interface IPlantData extends IGardenFetchedCell {
  scene?: Scene;
  x: number;
  y: number;
}

export type IPlantFieldData = Array<IPlantData | null>[];