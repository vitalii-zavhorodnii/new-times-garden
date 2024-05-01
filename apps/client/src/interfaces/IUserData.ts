export interface IUserGardenCell {
  title: string;
  texture: string;
  growTime: number;
  plantedAt: number;
  x: number;
  y: number;
}

export type IUserGarden = Array<IUserGardenCell | null>[];

export interface IUserData {
  telegramId: number;
  name: string;
  avatar?: string;
  balanceCoins: number;
  balanceTokens: number;
  garden: {
    _id: string;
    field: IUserGarden;
  };
}
