/**
 *
 * @param {number[]} values
 * @param {number} numberOfOptions
 */
const gen = (values, n) => {
  if (n === 1) {
    return values.map((v) => [v]);
  }

  const combos = [];

  for (let i = 0; i < values.length; i += 1) {
    const nextCombos = gen(values, n - 1);
    const together = nextCombos.map((nc) => [values[i], ...nc]);
    combos.push(...together);
  }

  return combos;
};

const generated = gen([true, false], 3);

const options = [{ on: false }, { on: false }, { on: false }];

for (let i = 0; i < generated.length; i += 1) {
  for (let j = 0; j < options.length; j += 1) {
    options[j].on = generated[i][j];
  }
  console.log(options);
}

console.log(generated);
