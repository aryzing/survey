import { Survey, FilterDefinition } from "@/types";
import { v4 as uuidv4 } from "uuid";
import db from ".";

export default (survey: Survey, filterDefinition: FilterDefinition): void => {
  Object.entries(survey.respondent_demographics).forEach(([id, r]) => {
    db.Respondents.set(id, { ...r, id, edgesAnswer: new Set<string>() });
  });

  survey.questions.forEach((q) => {
    const qId = uuidv4();
    db.Questions.set(qId, {
      id: qId,
      title: q.title,
      question_type: q.question_type,
      edgesAnswer: new Set<string>(),
      edgesRespondent: new Set<string>(),
    });

    q.answers.forEach((a) => {
      const aId = uuidv4();
      db.Answers.set(aId, {
        id: aId,
        text: a.text,
        edgesRespondent: new Set<string>(a.respondent_ids),
      });

      db.Questions.get(qId)?.edgesAnswer.add(aId);

      a.respondent_ids.forEach((rId) => {
        db.Respondents.get(rId)?.edgesAnswer.add(aId);
        db.Questions.get(qId)?.edgesRespondent.add(rId);
      });
    });
  });

  filterDefinition.demographics.forEach((f) => {
    const fId = uuidv4();
    db.Filters.set(fId, {
      id: fId,
      display: f.display,
      name: f.name,
      edgesOption: new Set<string>(),
      edgesRespondent: new Set<string>(),
    });

    f.options.forEach((o) => {
      const oId = uuidv4();

      db.Options.set(oId, {
        id: oId,
        display: o.display,
        isActive: false,
        name: o.name,
        edgesRespondent: new Set<string>(),
        filterId: fId,
      });

      db.Filters.get(fId)?.edgesOption.add(oId);

      db.Respondents.forEach((r) => {
        if (r[f.name] === o.name) {
          db.Options.get(oId)?.edgesRespondent.add(r.id);
          db.Filters.get(fId)?.edgesRespondent.add(r.id);
        }
      });
    });
  });
};
