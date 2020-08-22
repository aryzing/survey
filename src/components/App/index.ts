import { html, TemplateResult } from "lit-html";
import logError from "@/helpers/logger";
import { Survey, FilterDefinition } from "@/types";
import initStore from "@/store/initStore";
import store from "@/store";
import Component from "../Component";
import { loadingTemplate, errorTemplate, dataTemplate } from "./template";

export interface State {
  surveyRequest: {
    loading: boolean;
    error: unknown;
    data: Survey | undefined;
  };
  filterDefinitionRequest: {
    loading: boolean;
    error: unknown;
    data: FilterDefinition | undefined;
  };
}

export default class TestTaskApp extends Component<unknown, State> {
  unsubscribe: () => void;

  constructor(_props: unknown) {
    super(_props);

    this.state = {
      surveyRequest: {
        loading: false,
        error: undefined,
        data: undefined,
      },
      filterDefinitionRequest: {
        loading: false,
        error: undefined,
        data: undefined,
      },
    };

    this.unsubscribe = store.subscribe(() => this.renderIntoShadowDom());
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    if (!this.state) {
      logError("Expected state to be defined.");
      return;
    }

    this.setState({
      ...this.state,
      surveyRequest: {
        ...this.state.surveyRequest,
        loading: true,
      },
      filterDefinitionRequest: {
        ...this.state.filterDefinitionRequest,
        loading: true,
      },
    });

    let survey;
    let filterDefinition;
    try {
      [survey, filterDefinition] = await Promise.all<unknown, unknown>([
        await (await fetch("/api/survey")).json(),
        await (await fetch("/api/filter-definition")).json(),
      ]);
    } catch (error) {
      logError("Failed to fetch", error);

      this.setState({
        ...this.state,
        surveyRequest: {
          ...this.state.surveyRequest,
          loading: false,
          error: error as unknown,
        },
        filterDefinitionRequest: {
          ...this.state.filterDefinitionRequest,
          loading: false,
          error: error as unknown,
        },
      });
    }

    // If necessary, at this point in the code we could make use of user-defined
    // type guards to guarantee integrity of the received data.
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
    //
    // This exercise will cast the values.

    this.setState({
      ...this.state,
      surveyRequest: {
        ...this.state.surveyRequest,
        loading: false,
        data: survey as Survey,
      },
      filterDefinitionRequest: {
        ...this.state.filterDefinitionRequest,
        loading: false,
        data: filterDefinition as FilterDefinition,
      },
    });

    initStore(survey as Survey, filterDefinition as FilterDefinition);
    store.hasChanged();
  }

  disconnectedCallback(): void {
    this.unsubscribe();
  }

  render = (): TemplateResult => {
    if (!this.state) {
      logError("Expected state to be defined");
      return html``;
    }

    const {
      surveyRequest: {
        loading: surveyRequestLoading,
        error: surveyRequestError,
        data: surveyRequestData,
      },
      filterDefinitionRequest: {
        loading: filterDefinitionRequestLoading,
        error: filterDefinitionRequestError,
        data: filterDefinitionRequestData,
      },
    } = this.state;

    if (surveyRequestLoading || filterDefinitionRequestLoading) {
      return loadingTemplate();
    }

    if (surveyRequestError || filterDefinitionRequestError) {
      return errorTemplate({
        surveyRequestError,
        filterDefinitionRequestError,
      });
    }

    if (surveyRequestData && filterDefinitionRequestData) {
      return dataTemplate(surveyRequestData.title);
    }

    return html``;
  };
}

customElements.define("test-task-app", TestTaskApp);
