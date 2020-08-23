import { html, TemplateResult } from "lit-html";
import { renderDirective as r } from "@/helpers/renderDirective";
import { ResultsViewer } from "../ResultsViewer";
import { FiltersPanel } from "../FiltersPanel";
import { styles } from "./styles";

const baseTemplate = (s1: unknown, s2: unknown) => html`
  ${styles}
  <div class="container">
    <nav class="side-nav">
      <svg
        class="logo"
        viewBox="0 0 16 16"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 16L6.40001 0H9.60004L16 16H0ZM7.96392 5.093L5.12426 12.5101H10.7713L7.96392 5.093Z"
        />
      </svg>
    </nav>
    <div class="results">
      ${s1}
    </div>
    <div class="filters">
      ${s2}
    </div>
  </div>
`;

export const loadingTemplate = (): TemplateResult =>
  baseTemplate(html`<p>Loading...</p>`, html`<p>Loading...</p>`);

export const errorTemplate = (error: unknown): TemplateResult =>
  baseTemplate(html`<pre>${JSON.stringify(error, null, 2)}</pre>`, "");

export const dataTemplate = (surveyTitle: string): TemplateResult =>
  baseTemplate(
    html`${r(ResultsViewer, { surveyTitle })}`,
    html`${r(FiltersPanel, null)}`
  );
