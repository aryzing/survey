import { html } from "lit-html";
import { screen } from "testing-library__dom";
import { renderApp } from "../renderApp";

describe("Main app initialization", () => {
  const rootElementId = "root-element-test-id";

  beforeEach(() => {
    const rootElement = document.createElement("div");
    rootElement.setAttribute("id", rootElementId);
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    const rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
      throw new Error("Expected root element to exist after running test.");
    }

    document.body.removeChild(rootElement);
  });

  test("Renders app into element with given id when element exists", () => {
    const mockAppId = "mock-app-test-id";
    const mockApp = html`<p data-testid=${mockAppId}>Mock app</p>`;
    renderApp(mockApp, rootElementId);

    expect(screen.getByTestId(mockAppId)).toBeInTheDocument();
  });

  test("Logs error when element with given id does not exist", async () => {
    jest.resetModules();
    const mockLogError = jest.fn();
    jest.doMock("@/helpers/logger", () => ({
      __esModule: true,
      default: { mockLogError },
      logError: mockLogError,
    }));

    const { renderApp: renderAppWithMockedLogger } = await import(
      "../renderApp"
    );

    const mockAppId = "mock-app-test-id";
    const mockApp = html`<p data-testid=${mockAppId}>Mock app</p>`;
    renderAppWithMockedLogger(mockApp, "there-is-no-elem-with-this-id");

    expect(mockLogError).toHaveBeenCalled();
  });
});
