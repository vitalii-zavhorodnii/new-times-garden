import axios from 'axios';

export const harvestPlant = async (
  telegramId: string | number,
  rowIndex: number,
  plantIndex: number
): Promise<boolean> => {
  try {
    const { data } = await axios.post(`/actions/harvest`, {
      telegramId,
      rowIndex,
      plantIndex
    });

    return data;
  } catch (error) {
    return false;
  }
};
