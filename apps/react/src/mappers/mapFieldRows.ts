export const mapFieldRows = (coords: Array<{ x: number; y: number }>) => {
  const coordsFieldMap = [...Array(5).keys()];

  return coordsFieldMap.map(() => coords);
};
