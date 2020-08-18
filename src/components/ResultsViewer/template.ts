import { html, TemplateResult } from "lit-html";

import renderDirective from "@/helpers/renderDirective";
import AQuestion from "./components/AQuestion";
import type { QuestionWithStats } from "./types";
import styles from "./styles";

export default (
  title: string,
  questionsWithStats: QuestionWithStats[]
): TemplateResult => html`
  ${styles}
  <div class="container">
    <h1>${title}</h1>

    ${questionsWithStats.map((q) => html`${renderDirective(AQuestion, q)}`)}
  </div>
`;
