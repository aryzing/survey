import toRoundedPercent from "@/helpers/toPercent";
import { html, TemplateResult } from "lit-html";
import type { AnswerWithStats } from "../../types";
import styles from "./styles";

export default (
  title: string,
  answers: AnswerWithStats[]
): TemplateResult => html`
  ${styles}
  <div class="container">
    <h4>${title}</h4>
    <ul>
      ${answers.map((a) => {
        return html`<li>
          <span class="answer-text">${a.text}</span>
          <span>${toRoundedPercent(a.PRa)}</span>
          <span>${toRoundedPercent(a.PRFa)}</span>
        </li>`;
      })}
    </ul>
  </div>
`;
