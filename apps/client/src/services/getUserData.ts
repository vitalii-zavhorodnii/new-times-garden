import axios from 'axios';

import type { IUserData } from '@interfaces/IUserData';

export const getUserData = async (telegramId: number): Promise<IUserData | null> => {
  const { data } = await axios.get(`/users/${telegramId}`);
  console.log('user', data);
  return data;
};
