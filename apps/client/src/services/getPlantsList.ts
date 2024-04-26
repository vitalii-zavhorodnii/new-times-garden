import axios from 'axios';

import { IPlantsList } from 'src/interfaces/IPlantsMenu';

export const getPlantsList = async (): Promise<IPlantsList> => {
  const { data } = await axios.get('/plants/all');

  return data as IPlantsList;
};