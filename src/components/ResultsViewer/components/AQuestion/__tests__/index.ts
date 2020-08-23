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
    };
    const { getByText } = render(AQuestion, props);

    expect(getByText("test-question-title")).toMatchSnapshot();
    expect(getByText("Multiple choice")).toMatchSnapshot();
    expect(getByText("test-answer-1")).toMatchSnapshot();
    expect(getByText("11")).toMatchSnapshot();
    expect(getByText("12")).toMatchSnapshot();
    expect(getByText("test-answer-2")).toMatchSnapshot();
    expect(getByText("21")).toMatchSnapshot();
    expect(getByText("22")).toMatchSnapshot();
  });
});
