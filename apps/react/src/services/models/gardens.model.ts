export interface IGardenModel {
  _id: string;
  field: ICellData[][];
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
