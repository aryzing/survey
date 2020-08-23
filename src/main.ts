import "styles/main.css";

import { html } from "lit-html";
import { TestTaskApp } from "./components/App";
import { renderApp } from "./helpers/renderApp";
import { renderDirective as r } from "./helpers/renderDirective";

const rootElementId = "app";

renderApp(html`${r(TestTaskApp, null)}`, rootElementId);
