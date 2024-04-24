import axios from 'axios';

import { userGardenMapper } from 'src/mappers/mapUserGarden';

export const getUserGarden = async () => {
  const { data } = await axios.get('/plants');

  return userGardenMapper(data);
};
