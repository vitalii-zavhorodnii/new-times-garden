import axios from 'axios';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

export const getPlantsList = async (): Promise<IPlantListItem[]> => {
  const { data } = await axios.get('/plants');

  return data as IPlantListItem[];
};
