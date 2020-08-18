import { html, TemplateResult } from "lit-html";
import template from "./template";
import Component from "../Component";
import { QuestionWithStats } from "./types";

export interface Props {
  surveyTitle: string;
}

export default class ResultsViewer extends Component<Props> {
  render = (): TemplateResult => {
    const { surveyTitle } = this.props;

    const questionsWithStats: QuestionWithStats[] = [
      {
        question_type: "Question type",
        title: "Question title",
        answers: [{ PRa: 0.5, PRFa: 0.5, text: "Answer text" }],
      },
    ];

    return html`${template(surveyTitle, questionsWithStats)}`;
  };
}

customElements.define("results-viewer", ResultsViewer);
