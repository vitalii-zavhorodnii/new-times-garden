export interface IUserDto {
  _id: string;
  telegramId: number;
  name: string;
  avatar?: string;
  balanceCoins: number;
  balanceTokens: number;
  xp: number;
  garden: {
    _id: string;
    field: ICellDto[][];
  };
}

export interface ICellDto {
  plantedAt: number;
  plantedAtClient: number;
  plant: {
    title: string;
    description: string;
    texture: string;
    icon: string;
    growTime: number;
    gamePrice: number;
    tokenPrice: number;
    coinsIncome: number;
    tokensIncome: number;
    x?: number;
    y?: number;
  };
}
