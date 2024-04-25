import { mapFieldRows } from './mapFieldRows';

import { ROW_MAP } from '@constants/rows.constants';

export const userGardenMapper = (field) => {
  const data = field.map((item, rowIndex: number) => {
    const mapFieldCoords = mapFieldRows(ROW_MAP);

    return item.map((plant, plantIndex: number) => {
      const cell = { ...plant, ...mapFieldCoords[rowIndex][plantIndex] };

      return cell;
    });
  });

  return data;
};
