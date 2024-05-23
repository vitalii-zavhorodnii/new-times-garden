import axios from 'axios';

export const startGrowPlant = async (
  telegramId: string | number,
  plantId: string,
  rowIndex: number,
  plantIndex: number,
  plantedAtClient: number
): Promise<boolean> => {
  try {
    const { data } = await axios.post(`/actions/grow`, {
      telegramId,
      plantId,
      rowIndex,
      plantIndex,
      plantedAtClient
    });

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
