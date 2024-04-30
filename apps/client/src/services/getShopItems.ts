import axios from 'axios';

import type { IShopItem } from '@interfaces/IShopItem';

export const getShopItems = async (): Promise<IShopItem[]> => {
  const { data } = await axios.get('/products');

  return data as IShopItem[];
};
