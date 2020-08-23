import { html, TemplateResult } from "lit-html";
import { template } from "./template";
import { Component } from "../../../Component";
import { QuestionWithStats } from "../../types";

export const questionTypes = new Map<string, string>([
  ["multiple_choice", "Multiple choice"],
]);

export type Props = QuestionWithStats;

export class AQuestion extends Component<Props> {
  render = (): TemplateResult => {
    const { title, answers, question_type: type, hasActiveFilter } = this.props;

    return html`${template(
      title,
      questionTypes.get(type) ?? "",
      answers,
      hasActiveFilter
    )}`;
  };
}

customElements.define("a-question", AQuestion);
