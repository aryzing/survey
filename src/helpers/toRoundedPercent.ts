/**
 * Expects to receive as input a fraction which will be converted to a rounded
 * percentage.
 */
const toRoundedPercent = (n: number): number => {
  return Math.round(n * 100);
};

export default toRoundedPercent;
