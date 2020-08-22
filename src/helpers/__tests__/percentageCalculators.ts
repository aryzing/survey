import initStore from "@/store/initStore";
import store from "@/store";
import survey from "../__mockData__/survey";
import filterDefinition from "../__mockData__/filterDefinition";
import { PRa, PRFa, PRo } from "../percentageCalculators";

/**
 * Generate all possible combinations of an array containing only `values` as
 * elements and of length `n`.
 */
const gen = <T>(values: Array<T>, n: number): Array<Array<T>> => {
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
}

describe("Percentage calculations PRa, PRFa, PRo", () => {
  test("PR* evaluate to correct values", () => {
    initStore(survey, filterDefinition);

    const allOptions = Array.from(store.Options.values()).sort((a, b) =>
      a.name < b.name ? -1 : 1
    );

    const allPossibleCombinations = gen([true, false], allOptions.length);

    for (let i = 0; i < allPossibleCombinations.length; i += 1) {
      for (let j = 0; j < allOptions.length; j += 1) {
        allOptions[j].isActive = allPossibleCombinations[i][j];
      }
      const PRaResult = PRa();
      const PRFaResult = PRFa();
      const PRoResult = PRo();
      expect({
        options: Object.fromEntries(
          allOptions.map((o) => [o.name, o.isActive])
        ),
        PRa: PRaResult,
        PRFa: PRFaResult,
        PRo: PRoResult,
      }).toMatchSnapshot();
    }
  });
});
