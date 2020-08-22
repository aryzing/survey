import { render, TemplateResult } from "lit-html";
import logError from "./logger";

/**
 * Mant to be used only once at the top of the application to render content
 * into the DOM.
 */
const renderApp = (app: TemplateResult, id: string): void => {
  const rootElement = document.getElementById(id);

  if (!rootElement) {
    logError("Error: could not find root node where to render app.");
  } else {
    render(app, rootElement);
  }
};

export default renderApp;
