import { html, TemplateResult } from "lit-html";
import db from "@/db";
import logError from "@/helpers/logger";
import { GRespondentDemographic, GFilter } from "@/db/types";
import template from "./template";
import Component from "../Component";
import { QuestionWithStats } from "./types";

export interface Props {
  surveyTitle: string;
}

export default class ResultsViewer extends Component<Props> {
  render = (): TemplateResult => {
    const { surveyTitle } = this.props;

    const questionsWithStats: QuestionWithStats[] = Array.from(
      db.Questions.values()
    ).map((q) => {
      const activeOptions = Array.from(db.Options.values()).filter(
        (o) => o.isActive
      );

      const activeOptionFilterIds = new Set<string>();
      activeOptions.forEach((o) => activeOptionFilterIds.add(o.filterId));

      const activeFilters = Array.from(activeOptionFilterIds.values())
        .map((fId) => db.Filters.get(fId))
        .filter((f) => f) as GFilter[];

      /**
       * Collectino of users filtered according to active options. Respondents
       * are added to this collection when they match any of the active options
       * in a filter, and all filters where an option is active.
       *
       * In other words, options are "OR"ed against the value of a particular
       * demographic, and filters are "AND"ed across all demographics.
       */
      const filteredRespondents = Array.from(db.Respondents.values()).filter(
        (r) => {
          // This reducer acts as the "AND" for filters across all demographics
          return activeFilters.reduce<boolean>(
            (hasPassedPrevFilters, currFilter) => {
              // No need to compute whether the current filter will pass if a
              // previous one has already failed.
              if (!hasPassedPrevFilters) return false;

              const activeOptionsForCurrentFilter = activeOptions.filter(
                (o) => o.filterId === currFilter.id
              );

              // This reducer acts as the "OR" for options in the current filter.
              return activeOptionsForCurrentFilter.reduce<boolean>(
                (hasPassedPrevOptions, currOption) => {
                  // No need to compute whether the current option will pass if a
                  // previous one has already passed.
                  if (hasPassedPrevOptions) return true;

                  return r[currFilter.name] === currOption.name;
                },
                false
              );
            },
            true
          );
        }
      );

      const answers = Array.from(q.edgesAnswer.values()).map((aId) => {
        const answer = db.Answers.get(aId);

        if (!answer) {
          logError("Expected answer to be defined");
          return {
            text: "Unknown answer",
            PRa: 0,
            PRFa: 0,
          };
        }

        // PRa calculation
        const PRa = answer.edgesRespondent.size / q.edgesRespondent.size;

        // PRFa calculation
        const filteredRespondentsThatProvidedCurrentAnswer = filteredRespondents.filter(
          (r) => r.edgesAnswer.has(aId)
        );

        console.log(
          "Number filtered respondents for current answer: ",
          filteredRespondentsThatProvidedCurrentAnswer.length
        );

        console.log(
          "Total number filtered respondents: ",
          filteredRespondents.length
        );

        const PRFa = filteredRespondents.length
          ? filteredRespondentsThatProvidedCurrentAnswer.length /
            filteredRespondents.length
          : 0;

        const { text } = answer;

        return {
          text,
          PRa,
          PRFa,
        };
      });
      return {
        question_type: q.question_type,
        title: q.title,
        answers,
      };
    });

    return html`${template(surveyTitle, questionsWithStats)}`;
  };
}

customElements.define("results-viewer", ResultsViewer);
