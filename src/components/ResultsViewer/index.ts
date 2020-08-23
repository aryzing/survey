import { html, TemplateResult } from "lit-html";
import { store } from "@/store";
import { logError } from "@/helpers/logger";
import { PRa, PRFa } from "@/helpers/percentageCalculators";
import { template } from "./template";
import { Component } from "../Component";
import type { QuestionWithStats } from "./types";

export interface Props {
  surveyTitle: string;
}

export class ResultsViewer extends Component<Props> {
  render = (): TemplateResult => {
    const { surveyTitle } = this.props;

    const questionsWithStats: QuestionWithStats[] = Array.from(
      store.Questions.values()
    ).map((question) => {
      const answers = Array.from(question.edgesAnswer.values()).map((aId) => {
        const answer = store.Answers.get(aId);

        if (!answer) {
          logError("Expected answer to be defined");
          return {
            text: "Unknown answer",
            PRa: 0,
            PRFa: 0,
          };
        }

        return {
          text: answer.text,
          PRa: PRa(answer, question),
          PRFa: PRFa(answer, store),
        };
      });
      return {
        question_type: question.question_type,
        title: question.title,
        answers,
      };
    });

    return html`${template(surveyTitle, questionsWithStats)}`;
  };
}

customElements.define("results-viewer", ResultsViewer);
