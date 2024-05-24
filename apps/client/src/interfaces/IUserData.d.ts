import type { IAchievement } from './IAchievement';

export interface IUserData {
  _id: string;
  telegramId: number;
  name: string;
  avatar?: string;
  balanceCoins: number;
  balanceTokens: number;
  xp: number;
  playerLevel: number;
  garden: {
    _id: string;
    field: ICellData[][];
  };
  // quests: IQuestLog;
  achievements: IUserAchievement[];
}

export interface ICellData {
  plantedAt: number;
  plantedAtClient: number;
  plant: IPlantData;
}

export interface IPlantData {
  title: string;
  description: string;
  texture: string;
  icon: string;
  growTime: number;
  gamePrice: number;
  tokenPrice: number;
  coinsIncome: number;
  tokensIncome: number;
  xpIncome: number;
  x: number;
  y: number;
}

export interface IUserAchievement {
  achievement: IAchievement;
  progress: number;
  isCompleted: boolean;
}
