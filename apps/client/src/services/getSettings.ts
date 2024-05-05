import axios from 'axios';

export const getSettings = async (): Promise<any> => {
  const { data } = await axios.get('/settings');

  return data as any;
};
