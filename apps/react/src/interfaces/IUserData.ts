export interface IUserData {
  _id: string;
  telegramId: number;
  name: string;
  avatar?: string;
  balanceCoins: number;
  balanceTokens: number;
  xp: number;
  garden: {
    _id: string;
    field: ICellData[][];
  };
  quests: IQuestLog;
  achievements: IAchievementLog;
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

export interface IAchievementLog {
  completeCount: number;
  completed: IQuest[];
  todo: IQuest[];
}

export interface IQuestLog {
  completeCount: number;
  completed: IAchievement[];
  todo: IAchievement[];
}

export interface IQuest {}

export interface IAchievement {
  achievement: {
    plant: string;
    name: string;
    type: string;
    title: string;
    icon: string;
    texture: string;
    description: string;
    tokenReward: number;
    coinReward: number;
    xpReward: number;
  };
  goal: number;
  progress: number;
}
