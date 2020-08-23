import { toRoundedPercent } from "@/helpers/toRoundedPercent";
import { html, TemplateResult } from "lit-html";
import type { AnswerWithStats } from "../../types";
import { styles } from "./styles";

// eslint-disable-next-line import/prefer-default-export
export const template = (
  title: string,
  type: string,
  answers: AnswerWithStats[],
  hasActiveFilters: boolean
): TemplateResult => html`
  ${styles}
  <div class="container">
    <div class="question-title-container">
      <span class="question-title">${title}</span>
    </div>
    <div class="hack-for-grid-lines">
      <div class="results-container">
        ${answers.map((a) => {
          const percentToDisplay = hasActiveFilters ? a.PRFa : a.PRa;
          return html`<div class="row-container">
            <div class="answer-text-container">
              <span class="answer-text">${a.text}</span>
              <span class="percent"
                >${toRoundedPercent(percentToDisplay)}%</span
              >
            </div>
          </div>`;
        })}
      </div>
    </div>
    <div class="question-type-container">
      <span class="question-type">${type}</span>
    </div>
  </div>
`;
