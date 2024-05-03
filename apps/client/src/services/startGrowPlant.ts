import axios from 'axios';

import type { IUserData } from '@interfaces/IUserData';

export const startGrowPlant = async (
  userId: string | number,
  plantId: string,
  rowIndex: number,
  plantIndex: number
): Promise<{ user: IUserData; status: 'updated' | 'unchanged' }> => {
  const { data } = await axios.post(`/users/${userId}`, {
    plantId,
    rowIndex,
    plantIndex
  });

  return data;
};
