export const levelCalculator = (xp: number, gradation: number[]): number => {
  let level = 0;

  for (let i = 0; i < gradation.length; i++) {
    if (xp >= gradation[i]) {
      level = i;
    }
  }

  return level;
};
