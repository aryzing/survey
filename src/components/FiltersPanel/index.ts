import { html, TemplateResult } from "lit-html";
import logError from "@/helpers/logger";
import db from "@/db";
import Component from "../Component";
import styles from "./styles";

export default class FiltersPanel extends Component {
  unsubscribe: () => void;

  constructor(props: unknown) {
    super(props);

    this.unsubscribe = db.subscribe(() => this.renderIntoShadowDom());
  }

  disconnectedCallback(): void {
    this.unsubscribe();
  }

  handleOptionToggle = (e: Event): void => {
    const { currentTarget } = e;

    if (!(currentTarget instanceof Element)) {
      logError("Expected current target to be an Element");
      return;
    }

    const optionId = currentTarget.getAttribute("data-option-id");

    if (!optionId) {
      logError("Expected element to have a `data-option-id` attribute set");
      return;
    }

    const option = db.Options.get(optionId);

    if (!option) {
      logError("Expected option to exist");
      return;
    }

    option.isActive = !option.isActive;
    db.hasChanged();
  };

  render = (): TemplateResult => {
    return html`${styles}
    ${Array.from(db.Filters.values()).map((f) => {
      const optionsHtml = Array.from(f.edgesOption).map((oId) => {
        const option = db.Options.get(oId);

        if (!option) {
          return "";
        }

        const { display, isActive } = option;

        return html`<li @click=${this.handleOptionToggle} data-option-id=${oId}>
          ${display} ${isActive ? " [on]" : ""}
        </li>`;
      });

      return html`
        <p>${f.display}</p>
        <ul>
          ${optionsHtml}
        </ul>
      `;
    })}`;
  };
}

customElements.define("filters-panel", FiltersPanel);
