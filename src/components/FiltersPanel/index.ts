import { html, TemplateResult } from "lit-html";
import { logError } from "@/helpers/logger";
import { store } from "@/store";
import { toRoundedPercent } from "@/helpers/toRoundedPercent";
import { PRo } from "@/helpers/percentageCalculators";
import { Component } from "../Component";
import { styles } from "./styles";

// eslint-disable-next-line import/prefer-default-export
export class FiltersPanel extends Component {
  unsubscribe: () => void;

  constructor(props: unknown) {
    super(props);

    this.unsubscribe = store.subscribe(() => this.renderIntoShadowDom());
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

    const option = store.Options.get(optionId);

    if (!option) {
      logError("Expected option to exist");
      return;
    }

    option.isActive = !option.isActive;
    store.hasChanged();
  };

  render = (): TemplateResult => {
    return html` ${styles}
      <div class="container">
        <h2 class="title">Filters</h2>
        <div class="options-container">
          ${Array.from(store.Filters.values()).map((f) => {
            const optionsHtml = Array.from(f.edgesOption).map((oId) => {
              const option = store.Options.get(oId);

              if (!option) {
                return "";
              }

              const { display, isActive } = option;

              return html`<div
                class="option-toggle ${isActive ? "active" : ""}"
                @click=${this.handleOptionToggle}
                data-option-id=${oId}
                data-testid=${oId}
              >
                <span class="option-name">${display}</span>
                <span class="option-percent"
                  >${toRoundedPercent(PRo(option, store))}%</span
                >
              </div>`;
            });

            return html`
              <div class="filter-block">
                <h3 class="filter-title">${f.display}</h3>
                <div class="options-toggle-group">
                  ${optionsHtml}
                </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>`;
  };
}

customElements.define("filters-panel", FiltersPanel);
