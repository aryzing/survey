import { html } from "lit-html";

export default html`
  <style>
    .container {
      display: grid;
      grid-template-columns: 50px 5fr 3fr;
      grid-template-rows: auto;
      grid-template-areas: "side-nav results filters";
      height: 100%;
    }

    .side-nav {
      grid-area: side-nav;
      background-color: var(--color-accent);
    }

    .results {
      grid-area: results;
    }

    .filters {
      grid-area: filters;
      background-color: var(--color-white);
    }
  </style>
`;
