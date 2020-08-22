import { GQuestion, GAnswer, GStore, GFilter } from "@/store/types";

export const PRa = (answer: GAnswer, question: GQuestion): number => {
  return answer.edgesRespondent.size / question.edgesRespondent.size;
};

export const PRFa = (answer: GAnswer, store: GStore): number => {
  const activeOptions = Array.from(store.Options.values()).filter(
    (o) => o.isActive
  );

  const activeOptionFilterIds = new Set<string>();
  activeOptions.forEach((o) => activeOptionFilterIds.add(o.filterId));

  const activeFilters = Array.from(activeOptionFilterIds.values())
    .map((fId) => store.Filters.get(fId))
    .filter((f) => f) as GFilter[];

  /**
   * Collectino of users filtered according to active options. Respondents
   * are added to this collection when they match any of the active options
   * in a filter, and all filters where an option is active.
   *
   * In other words, options are "OR"ed against the value of a particular
   * demographic, and filters are "AND"ed across all demographics.
   */
  const filteredRespondents = Array.from(store.Respondents.values()).filter(
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

  const filteredRespondentsThatProvidedCurrentAnswer = filteredRespondents.filter(
    (r) => r.edgesAnswer.has(answer.id)
  );

  return filteredRespondents.length
    ? filteredRespondentsThatProvidedCurrentAnswer.length /
        filteredRespondents.length
    : 0;
};
export const PRo = () => {
  return 3;
};
