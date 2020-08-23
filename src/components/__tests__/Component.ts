/* eslint-disable max-classes-per-file */
import { html } from "lit-html";
import { screen } from "testing-library__dom";
import { render } from "@/helpers/render";
import { Component } from "../Component";

describe("Component base class", () => {
  interface Props {
    label: string;
  }
  interface State {
    count: number;
  }
  class TestComponent extends Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = { count: 0 };
    }

    render() {
      return html`<div>
        <span>${this.props.label}</span><span>${this.state?.count}</span>
      </div>`;
    }
  }
  customElements.define("test-component", TestComponent);

  test("Renders content when attached to DOM", () => {
    const testComponent = new TestComponent({ label: "counter" });

    if (!testComponent.shadowRoot) {
      throw new Error("Expected an open shadow DOM to be attached.");
    }

    expect(screen.queryAllByText("counter")).toHaveLength(0);

    const div = document.createElement("div");
    div.append(testComponent);
    document.body.append(div);

    expect(screen.queryAllByText("counter")).toHaveLength(1);

    document.body.removeChild(div);
  });

  test("Changing props triggers render", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { cleanup, getByText, component: testComponent } = render<
      Props,
      State
    >(TestComponent, { label: "counter" });

    expect(getByText("counter")).not.toBeNull();

    testComponent.setProps({ label: "another label" });

    expect(getByText("another label")).not.toBeNull();
    cleanup();
  });

  test("Changing state triggers render", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { cleanup, getByText, component: testComponent } = render<
      Props,
      State
    >(TestComponent, { label: "counter" });

    expect(getByText("0")).not.toBeNull();

    testComponent.setState({ count: 123 });

    expect(getByText("123")).not.toBeNull();

    cleanup();
  });

  test("Logs error when render method not supplied", async () => {
    jest.resetModules();
    const mockLogError = jest.fn();
    jest.doMock("@/helpers/logger", () => ({
      __esModule: true,
      default: { mockLogError },
      logError: mockLogError,
    }));
    const { Component: ComponentWithMockedLogger } = await import(
      "../Component"
    );

    class TestComponentWithoutRender extends ComponentWithMockedLogger {}
    customElements.define(
      "test-component-without-render",
      TestComponentWithoutRender
    );

    render(TestComponentWithoutRender, null);

    expect(mockLogError).toHaveBeenCalled();
  });
});
