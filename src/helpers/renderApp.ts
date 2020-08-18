import { render, TemplateResult } from "lit-html";
import logError from "./logger";

const renderApp = (app: TemplateResult, id: string): void => {
  const rootElement = document.getElementById(id);

  if (!rootElement) {
    logError("Error: could not find root node where to render app.");
  } else {
    render(app, rootElement);
  }
};

export default renderApp;
