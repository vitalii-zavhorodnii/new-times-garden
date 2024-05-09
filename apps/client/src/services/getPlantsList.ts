import axios from 'axios';

import type { IPlantsList } from '@interfaces/IPlantListItem';

export const getPlantsList = async (): Promise<IPlantsList> => {
  const { data } = await axios.get('/plants');

  return data as IPlantsList;
};
