import axios from 'axios';

export const getUserData = async (telegramId: number): Promise<any> => {
  const { data } = await axios.get(`/users/${telegramId}`);

  return data;
};
