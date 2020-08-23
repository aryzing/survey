import { html } from "lit-html";

// eslint-disable-next-line import/prefer-default-export
export const styles = html`
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

    .logo {
      width: 18px;
      height: 18px;
      margin: 16px;
    }
  </style>
`;
