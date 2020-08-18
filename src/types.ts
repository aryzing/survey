export interface Option {
  name: string;
  display: string;
}

export interface Filter {
  name: string;
  display: string;
  options: Array<Option>;
}

export interface FilterDefinition {
  demographics: Array<Filter>;
}

export interface Answer {
  text: string;
  respondent_ids: Array<string>;
}

export interface Question {
  title: string;
  question_type: string;
  answers: Array<Answer>;
}

export interface RespondentDemographic {
  gender: string;
  home_region: string;
  relationship_status: string;
}

export interface Survey {
  title: string;
  questions: Array<Question>;
  respondent_demographics: Record<string, RespondentDemographic>;
}
