import { mapFieldRows } from './mapFieldRows';

import { ROW_MAP } from '@constants/rows.constants';

import type { ICellData } from '@interfaces/IUserData';
import type { ICellDto } from '@interfaces/IUserDto';

export const userGardenMapper = (field: ICellDto[][]): ICellData[][] => {
  const data = field.map((item, rowIndex: number) => {
    const concatCoordsFetched = mapFieldRows(ROW_MAP);

    return item.map((cell, cellIndex: number) => {
      const mappedCell = { ...cell };
      mappedCell.plant = {
        ...mappedCell.plant,
        ...concatCoordsFetched[rowIndex][cellIndex]
      };

      return mappedCell;
    });
  });

  return data as ICellData[][];
};
