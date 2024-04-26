import { mapFieldRows } from './mapFieldRows';

import { ROW_MAP } from '@constants/rows.constants';

import { IGardenFetched } from '@interfaces/IGardenFetched';
import { IPlantData } from '@interfaces/IPlantData';

export const userGardenMapper = (field: IGardenFetched): IPlantData[][] => {
  const data = field.map((item, rowIndex: number) => {
    const concatCoordsFetched = mapFieldRows(ROW_MAP);

    return item.map((plant, plantIndex: number) => {
      const cell = { ...plant, ...concatCoordsFetched[rowIndex][plantIndex] };

      return cell;
    });
  });

  return data;
};
