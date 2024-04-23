import axios from 'axios';

import { userGardenMapper } from 'src/mappers/mapUserGarden';

import { plants } from 'src/constants/temp';

export const getUserGarden = async () => {
  // const { data } = await axios.get('http://172.20.0.1:3000/');

  return userGardenMapper(plants);
};
