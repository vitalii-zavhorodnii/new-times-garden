import { IPlantData } from './IUserData';

declare global {
  export interface IAchievement {
    title: string;
    description: string;
    icon: string;
    type: 'harvest' | 'badge';
    steps: number[];
    coinReward: number[];
    tokenReward: number[];
    xpReward: number[];
    plant: IPlantData;
  }
}

export {};
