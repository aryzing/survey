import type {
  GOption,
  GRespondentDemographic,
  GQuestion,
  GAnswer,
  GFilter,
  GStore,
  Listener,
  Unsubscribe,
} from "./types";

let listeners: Array<Listener> = [];

const subscribe = (listener: Listener): Unsubscribe => {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const hasChanged = (): void => {
  listeners.forEach((l) => {
    l();
  });
};

const Options = new Map<string, GOption>();

const Respondents = new Map<string, GRespondentDemographic>();

const Questions = new Map<string, GQuestion>();

const Answers = new Map<string, GAnswer>();

const Filters = new Map<string, GFilter>();

const store: GStore = {
  subscribe,
  hasChanged,
  Options,
  Respondents,
  Questions,
  Answers,
  Filters,
};

export default store;
