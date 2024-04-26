import { mapFieldRows } from './mapFieldRows';

import { ROW_MAP } from '@constants/rows.constants';

import { IGardenCellSprite } from 'src/interfaces/IPlantData';
import { IGardenFetched } from '@interfaces/IGardenFetched';

export const userGardenMapper = (field: IGardenFetched): IGardenCellSprite[][] => {
  const data = field.map((item, rowIndex: number) => {
    const concatCoordsFetched = mapFieldRows(ROW_MAP);

    return item.map((plant, plantIndex: number) => {
      const cell = { ...plant, ...concatCoordsFetched[rowIndex][plantIndex] };

      return cell;
    });
  });

  return data;
};
