/**
 * Expects to receive as input a fraction which will be converted to a rounded
 * percentage.
 */
// eslint-disable-next-line import/prefer-default-export
export const toRoundedPercent = (n: number): number => {
  return Math.round(n * 100);
};
