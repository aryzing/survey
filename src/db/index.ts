import {
  Option,
  RespondentDemographic,
  Question,
  Answer,
  Filter,
} from "@/types";

type Listener = () => void;
type Unsubscribe = () => void;

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

interface GOption extends Option {
  id: string;
  isActive: boolean;
  edgesRespondent: Set<string>;
}

const Options = new Map<string, GOption>();

interface GRespondentDemographic extends RespondentDemographic {
  id: string;
  edgesAnswer: Set<string>;
  [k: string]: string | Set<string>;
}

const Respondents = new Map<string, GRespondentDemographic>();

interface GQuestion extends Pick<Question, "title" | "question_type"> {
  id: string;
  edgesAnswer: Set<string>;
  edgesRespondent: Set<string>;
}

const Questions = new Map<string, GQuestion>();

interface GAnswer extends Pick<Answer, "text"> {
  id: string;
  edgesRespondent: Set<string>;
}

const Answers = new Map<string, GAnswer>();

interface GFilter extends Pick<Filter, "name" | "display"> {
  id: string;
  edgesOption: Set<string>;
  edgesRespondent: Set<string>;
}

const Filters = new Map<string, GFilter>();

const db = {
  subscribe,
  hasChanged,
  Options,
  Respondents,
  Questions,
  Answers,
  Filters,
};

export default db;
