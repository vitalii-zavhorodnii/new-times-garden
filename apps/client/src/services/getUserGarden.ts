import axios from 'axios';

import { userGardenMapper } from '@mappers/mapUserGarden';

import type { IPlantData } from '@interfaces/IPlantData';

export const getUserGarden = async (id: number): Promise<IPlantData[][]> => {
  const { data } = await axios.get(`/gardens/${id}`);

  return userGardenMapper(data);
};
