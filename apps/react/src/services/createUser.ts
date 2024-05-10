import axios from 'axios';

import type { IUserData } from '@interfaces/IUserData';

interface IUserDataProps {
  telegramId: string;
  name: string;
  avatar?: string;
  isActive?: boolean;
}

export const createUser = async (user: IUserDataProps): Promise<IUserData> => {
  const { data } = await axios.post('/users', user);

  return data;
};
