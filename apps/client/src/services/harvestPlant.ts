import axios from 'axios';

import type { IUserData } from '@interfaces/IUserData';

export const harvestPlant = async (
  userId: string | number,
  rowIndex: number,
  plantIndex: number
): Promise<{ user: IUserData; status: 'updated' | 'unchanged' }> => {
  const { data } = await axios.post(`/users/${userId}/harvest`, {
    rowIndex,
    plantIndex
  });

  return data;
};
