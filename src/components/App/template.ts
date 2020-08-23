import { html, TemplateResult } from "lit-html";
import { renderDirective as r } from "@/helpers/renderDirective";
import { ResultsViewer } from "../ResultsViewer";
import { FiltersPanel } from "../FiltersPanel";
import { styles } from "./styles";

const baseTemplate = (s1: unknown, s2: unknown) => html`
  ${styles}
  <div class="container">
    <nav class="side-nav"></nav>
    <div class="results">
      ${s1}
    </div>
    <div class="filters">
      <h3>Filters</h3>
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
