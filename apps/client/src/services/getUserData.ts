import axios from 'axios';

import { userGardenMapper } from '@mappers/mapUserGarden';

export const getUserData = async (telegramId: number): Promise<any> => {
  const { data } = await axios.get(`/users/${telegramId}`);

  if (!data._id) {
    return null;
  }

  data.garden = userGardenMapper(data.garden);

  return data;
};
