import logError from "@/helpers/logger";
import { render as litRender, TemplateResult, html } from "lit-html";

export default class Component<P = unknown, S = unknown> extends HTMLElement {
  props: Readonly<P>;

  state?: Readonly<S>;

  constructor(props: P) {
    super();
    this.attachShadow({ mode: "open" });

    this.props = props;
  }

  connectedCallback(): void {
    this.renderIntoShadowDom();
  }

  setProps = (props: P): void => {
    this.props = props;
    if (this.isConnected) {
      this.renderIntoShadowDom();
    }
  };

  setState = (state: S): void => {
    this.state = state;
    if (this.isConnected) {
      this.renderIntoShadowDom();
    }
  };

  renderIntoShadowDom(): void {
    if (!this.shadowRoot) {
      logError("Expected shadow root to exist.");
      return;
    }

    litRender(this.render(), this.shadowRoot);
  }

  render(): TemplateResult {
    logError(
      `Oops, looks like you forgot to define a render method for \`${this.constructor.name}\`.`
    );
    return html``;
  }
}
