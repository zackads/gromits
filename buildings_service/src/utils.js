export const parseLocationParameter = (locationString) => {
  // "@51.47552,-2.60833" ==> [51.47552, -2.60833]
  return locationString
    .substring(1)
    .split(',')
    .map((datum) => parseFloat(datum));
};
