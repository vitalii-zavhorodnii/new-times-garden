import axios from 'axios';

interface IUserDataProps {
  telegramId: number;
  name: string;
  avatar?: string;
  isActive?: boolean;
}

export const createUser = async (user: IUserDataProps): Promise<void> => {
  const { data } = await axios.post('/users', user);

  return data;
};
