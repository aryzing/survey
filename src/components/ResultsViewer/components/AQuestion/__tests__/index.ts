import { render } from "@/helpers/render";
import type { QuestionWithStats } from "@/components/ResultsViewer/types";
import { AQuestion } from "..";

describe("AQuestion Component", () => {
  test("Renders properly", () => {
    const props: QuestionWithStats = {
      title: "test-question-title",
      question_type: "multiple_choice",
      answers: [
        {
          text: "test-answer-1",
          PRFa: 0.11,
          PRa: 0.12,
        },
        {
          text: "test-answer-2",
          PRFa: 0.21,
          PRa: 0.22,
        },
      ],
      hasActiveFilter: true,
    };
    const { getByText, queryAllByText } = render(AQuestion, props);

    expect(getByText("test-question-title")).toMatchSnapshot();
    expect(getByText("Multiple choice")).toMatchSnapshot();
    expect(getByText("test-answer-1")).toMatchSnapshot();
    expect(queryAllByText("11")).toHaveLength(0);
    expect(getByText("12")).toMatchSnapshot();
    expect(getByText("test-answer-2")).toMatchSnapshot();
    expect(queryAllByText("21")).toHaveLength(0);
    expect(getByText("22")).toMatchSnapshot();
  });
});
