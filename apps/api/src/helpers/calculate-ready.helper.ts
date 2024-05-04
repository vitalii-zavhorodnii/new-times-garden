import { DateTime } from 'luxon';

export const calculateReadyHelper = (
  plantedAt: number,
  growTime: number
): boolean => {
  const currentTime = DateTime.now();

  const endTime = DateTime.fromMillis(plantedAt + growTime);
  const diff1 = endTime.diff(currentTime).toMillis();
  const percentLeft = Math.floor((diff1 / growTime) * 100);

  if (percentLeft > 0) {
    return false;
  }

  return true;
};
