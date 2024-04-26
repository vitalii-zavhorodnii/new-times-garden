import axios from 'axios';

import { userGardenMapper } from '@mappers/mapUserGarden';

import { IPlantData } from '@interfaces/IPlantData';

export const getUserGarden = async (): Promise<IPlantData[][]> => {
  const { data } = await axios.get('/gardens');

  return userGardenMapper(data);
};
