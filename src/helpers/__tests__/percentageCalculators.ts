import { seedStore } from "@/store/seedStore";
import { store } from "@/store";
import { survey } from "../__mockData__/survey";
import { filterDefinition } from "../__mockData__/filterDefinition";
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

/**
 * Number of options whose active state may be changed to calculate percentages.
 * Note there are 2 ^ numberOfOptionsInDomain possible combinations for a set of
 * options with different active states.
 */
const numberOfOptionsInDomain = 4;

describe("Percentage calculations.", () => {
  // Ensure all tests start from a known store state.
  beforeEach(() => {
    seedStore(survey, filterDefinition);
  });

  afterEach(() => {});

  test("PRa evaluates correctly.", () => {
    const allQuestions = Array.from(store.Questions.values());

    for (let i = 0; i < allQuestions.length; i += 1) {
      const question = allQuestions[i];

      const answers = Array.from(question.edgesAnswer.values()).map((aId) =>
        store.Answers.get(aId)
      );

      for (let j = 0; j < answers.length; j += 1) {
        const answer = answers[j];

        if (answer) {
          expect({
            answer: answer.text,
            PRa: PRa(answer, question),
          }).toMatchSnapshot();
        }
      }
    }
  });

  test("PRFa evaluates correctly.", () => {
    const allOptions = Array.from(store.Options.values()).sort((a, b) =>
      a.name < b.name ? -1 : 1
    );

    const allAnswers = Array.from(store.Answers.values()).sort((a, b) =>
      a.text < b.text ? -1 : 1
    );

    const optionCombinations = gen([true, false], numberOfOptionsInDomain);

    for (let i = 0; i < optionCombinations.length; i += 1) {
      for (let j = 0; j < numberOfOptionsInDomain; j += 1) {
        allOptions[j].isActive = optionCombinations[i][j];
      }

      for (let x = 0; x < allAnswers.length; x += 1) {
        expect({
          options: Object.fromEntries(
            allOptions.map((o) => [o.name, o.isActive])
          ),
          PRFa: PRFa(allAnswers[x], store),
          answer: allAnswers[x].text,
        }).toMatchSnapshot();
      }
    }
  });

  test("PRo evaluates correctly.", () => {
    const options = Array.from(store.Options.values());

    options.forEach((option) => {
      expect(PRo(option, store)).toMatchSnapshot();
    });
  });
});
