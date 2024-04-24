import { PLANT_COORDS } from '@constants/plant-coords';

export const userGardenMapper = (field) => {
  const data = field.map((item, rowIndex) => {
    // console.log({ item });
    return item.map((plant, plantIndex) => {
      const cell = { ...plant, ...PLANT_COORDS[rowIndex][plantIndex] };

      return cell;
    });
  });

  return data;
};
