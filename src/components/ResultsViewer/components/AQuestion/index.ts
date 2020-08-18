import { html, TemplateResult } from "lit-html";
import template from "./template";
import Component from "../../../Component";
import { QuestionWithStats } from "../../types";

export type Props = QuestionWithStats;

export default class AQuestion extends Component<Props> {
  render = (): TemplateResult => {
    const { title, answers } = this.props;

    return html`${template(title, answers)}`;
  };
}

customElements.define("a-question", AQuestion);
