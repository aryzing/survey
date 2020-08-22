import { Survey, FilterDefinition } from "@/types";
import { v4 as uuidv4 } from "uuid";
import store from ".";

export default (survey: Survey, filterDefinition: FilterDefinition): void => {
  Object.entries(survey.respondent_demographics).forEach(([id, r]) => {
    store.Respondents.set(id, { ...r, id, edgesAnswer: new Set<string>() });
  });

  survey.questions.forEach((q) => {
    const qId = uuidv4();
    store.Questions.set(qId, {
      id: qId,
      title: q.title,
      question_type: q.question_type,
      edgesAnswer: new Set<string>(),
      edgesRespondent: new Set<string>(),
    });

    q.answers.forEach((a) => {
      const aId = uuidv4();
      store.Answers.set(aId, {
        id: aId,
        text: a.text,
        edgesRespondent: new Set<string>(a.respondent_ids),
      });

      store.Questions.get(qId)?.edgesAnswer.add(aId);

      a.respondent_ids.forEach((rId) => {
        store.Respondents.get(rId)?.edgesAnswer.add(aId);
        store.Questions.get(qId)?.edgesRespondent.add(rId);
      });
    });
  });

  filterDefinition.demographics.forEach((f) => {
    const fId = uuidv4();
    store.Filters.set(fId, {
      id: fId,
      display: f.display,
      name: f.name,
      edgesOption: new Set<string>(),
      edgesRespondent: new Set<string>(),
    });

    f.options.forEach((o) => {
      const oId = uuidv4();

      store.Options.set(oId, {
        id: oId,
        display: o.display,
        isActive: false,
        name: o.name,
        edgesRespondent: new Set<string>(),
        filterId: fId,
      });

      store.Filters.get(fId)?.edgesOption.add(oId);

      store.Respondents.forEach((r) => {
        if (r[f.name] === o.name) {
          store.Options.get(oId)?.edgesRespondent.add(r.id);
          store.Filters.get(fId)?.edgesRespondent.add(r.id);
        }
      });
    });
  });
};
