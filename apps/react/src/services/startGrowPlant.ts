import axios from 'axios';

export const startGrowPlant = async (
  userId: string | number,
  plantId: string,
  rowIndex: number,
  plantIndex: number,
  plantedAtClient: number
): Promise<boolean> => {
  const { data } = await axios.post(`/users/${userId}/start-grow`, {
    plantId,
    rowIndex,
    plantIndex,
    plantedAtClient
  });

  return data;
};
