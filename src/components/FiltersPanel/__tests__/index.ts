import { seedStore } from "@/store/seedStore";
import { survey } from "@/__mockData__/survey";
import { filterDefinition } from "@/__mockData__/filterDefinition";
import { store } from "@/store";
import { render } from "@/helpers/render";
import { fireEvent } from "testing-library__dom";
import { FiltersPanel } from "..";

seedStore(survey, filterDefinition);

describe("FiltersPanel component.", () => {
  test("Click handler called when an option is clicked", () => {
    const { getByTestId } = render(FiltersPanel, null);

    const option = Array.from(store.Options.values())[0];

    expect(option.isActive).toBe(false);

    const element = getByTestId(option.id);

    fireEvent.click(element);

    expect(option.isActive).toBe(true);
  });
});
