export interface IPlantsList {
  [index: string]: IPlantListItem[];
  vegetables: IPlantListItem[];
  fruits: IPlantListItem[];
  berries: IPlantListItem[];
  flowers: IPlantListItem[];
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
}
