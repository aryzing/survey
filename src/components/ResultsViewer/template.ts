import { html, TemplateResult } from "lit-html";

import { renderDirective as r } from "@/helpers/renderDirective";
import { AQuestion } from "./components/AQuestion";
import type { QuestionWithStats } from "./types";
import { styles } from "./styles";

// eslint-disable-next-line import/prefer-default-export
export const template = (
  title: string,
  questionsWithStats: QuestionWithStats[]
): TemplateResult => html`
  ${styles}
  <div class="container">
    <h1 class="title">${title}</h1>

    ${questionsWithStats.map((q) => html`${r(AQuestion, q)}`)}
  </div>
`;
