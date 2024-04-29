import axios from 'axios';

interface IUserData {
  telegramId: number;
  name: string;
  avatar: string;
  isActive?: boolean;
}

export const createUser = async (user: IUserData): Promise<void> => {
  const { data } = await axios.post('/users', user);

  return data;
};
