export const mapFieldRows = (coords: any): any[] => {
  const coordsFieldMap = [...Array(5).keys()];

  return coordsFieldMap.map(() => coords);
};
