import { Scene } from 'phaser';

import { ICellData } from '@interfaces/IUserData';

export interface IPlantData extends ICellData {
  scene?: Scene;
  x: number;
  y: number;
}

export type IPlantFieldData = Array<IPlantData | null>[];
