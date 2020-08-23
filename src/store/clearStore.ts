import { store } from ".";
import {
  GOption,
  GRespondentDemographic,
  GQuestion,
  GAnswer,
  GFilter,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const clearStore = (): void => {
  store.Options = new Map<string, GOption>();

  store.Respondents = new Map<string, GRespondentDemographic>();

  store.Questions = new Map<string, GQuestion>();

  store.Answers = new Map<string, GAnswer>();

  store.Filters = new Map<string, GFilter>();
};
