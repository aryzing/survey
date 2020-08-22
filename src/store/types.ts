// Note: Most interfaces below are prefixed with a "G" to distinguish them from
// the types representing the server data.
//
// The letter "G" has been chosen because the store represents a graph.

import {
  RespondentDemographic,
  Question,
  Answer,
  Filter,
  Option,
} from "@/types";

export interface GOption extends Option {
  id: string;
  isActive: boolean;
  edgesRespondent: Set<string>;
  filterId: string;
}

export interface GRespondentDemographic extends RespondentDemographic {
  id: string;
  edgesAnswer: Set<string>;
  [k: string]: string | Set<string>;
}

export interface GQuestion extends Pick<Question, "title" | "question_type"> {
  id: string;
  edgesAnswer: Set<string>;
  edgesRespondent: Set<string>;
}

export interface GAnswer extends Pick<Answer, "text"> {
  id: string;
  edgesRespondent: Set<string>;
}

export interface GFilter extends Pick<Filter, "name" | "display"> {
  id: string;
  edgesOption: Set<string>;
  edgesRespondent: Set<string>;
}

export type Listener = () => void;
export type Unsubscribe = () => void;

export interface GStore {
  subscribe(l: Listener): Unsubscribe;
  hasChanged(): void;
  Options: Map<string, GOption>;
  Respondents: Map<string, GRespondentDemographic>;
  Questions: Map<string, GQuestion>;
  Answers: Map<string, GAnswer>;
  Filters: Map<string, GFilter>;
}
