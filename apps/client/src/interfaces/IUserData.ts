export interface IUserData {
  _id: string;
  telegramId: number;
  name: string;
  avatar?: string;
  balanceCoins: number;
  balanceTokens: number;
  garden: {
    _id: string;
    field: ICellData[][];
  };
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
  x: number;
  y: number;
}
