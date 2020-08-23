## Notes

Thank you for taking the time to review this test task.

Upon inspection of the rules and the provided Figma designs, it seems that two key parts of this test are

* Managing filter and survey data in a way that allows sound inspection and manipulation, as well as facilitating derived computations (ie, answer percentages for active filters).
* Establishing conventions for UI management and data binding.

### Data management

The data for this task is obtained from two sources. The UI data requirements, as seen in the Figma designs, are:

1. Display questions
2. Display questions' answers
3. Display questions' answers' respondent percentage
4. Display questions' answers' respondent percentage with filters
5. Display filters
6. Display filters' options
7. Display filters' options' respondent percentage

Items 3., 4., and 7. requires data from both the survey and the filter definitions to be computed. To reference these items with ease, we'll call them

* *PR(a)* (point 3) Percentage of respondents for a given answer.
* *PRF(a)* (point 4) Percentage of respondents with filters applied for a given answer.
* *PR(o)* (point 7) Percentage of respondents for a given option.

To facilitate the computation of these percentages, this test uses a store built with an ad-hoc graph data structure. The data lends itself to be represented graphically as:

<img src="./__files__/graph.jpg"/>

Each node type has mostly the same properties as the equivalent type in the survey and filter definition data set, with additions to support their inclusion in a graph data structure. Their definition is in the [store types](./src/store/types.ts). The code uses a more generic `edges*` property name for the edges.

At this time some edges are not in use. Performance enhancements may be implemented by using some of the unused edges (ie, instead of filtering by all respondents, only filter by the subset of respondents associated with active options.)

**Calculating percentages using the graph**

The graph facilitates calculation of *PR(a)*, *PRF(a)* and *PR(o)*. More details available in [their implementation](src/helpers/percentageCalculators.ts).

**Reacting to store changes**

The graph store has a rudimentary subscription mechanism that allows listeners to subscribe to changes in the store, and which is triggered manually. All changes in the store are performed by mutating the store data.

### UI Conventions

This test task manages the UI with the [`lit-html`](https://lit-html.polymer-project.org/) library and an ad-hoc [`Component`](src/components/Component.ts) class. Components support

* passing props for cross-component data-flow
* managing internal state
* life-cycle methods powered by the Custom Elements standard
* scoped styles by leveraging Shadow DOM

To narrow the scope of the Component implementation, this task does not support

* using `<slot>`s due to loss of TS types
* setting and syncing attributes with component state
* rely on browser to garbage collect event listeners on dom elements that are no longer reachable
* using a custom element defined by a component directly in the DOM

To benefit from the graph store described above, Components can manually hook into store changes.

### Misc. details

When using `lit-html` to render `Component`s, using the [`renderComponent` directive](src/helpers/renderDirective.ts) will avoid unnecessary re-renders.

Where convenient, components are constructed from three files:

* `index.ts`: component logic
* `template.ts`: structure of the UI elements
* `styles.ts`: styling

Component styles are not processed by webpack loaders. They do, however, benefit from the globally defined variables as css variables cross the Shadow DOM boundary.