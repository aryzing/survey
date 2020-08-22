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
