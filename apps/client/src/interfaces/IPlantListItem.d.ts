export interface IPlantsList {
  simple: IPlantListItem[];
  advanced: IPlantListItem[];
  special: IPlantListItem[];
}

export interface IPlantListItem {
  _id: string;
  icon: string;
  title: string;
  description: string;
  texture: string;
  growTime: number;
  gamePrice: number;
  tokenPrice: number;
  coinsIncome: number;
  tokensIncome: number;
  xpIncome: number;
  requiredLevel: number;
}
