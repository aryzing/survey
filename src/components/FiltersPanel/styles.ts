import { html } from "lit-html";

// eslint-disable-next-line import/prefer-default-export
export const styles = html`
  <style>
    .title {
      font-size: 20px;
      line-height: 22px;
      text-align: center;
      font-weight: normal;
      margin: 24px;
    }

    .options-container {
      background: rgba(197, 207, 218, 0.2);
      margin: 24px;
    }

    .filter-block {
      padding: 16px;
    }

    .filter-title {
      color: var(--color-storm);
      font-weight: normal;
      font-size: 13px;
      line-height: 17px;
      margin: 0;
      margin-bottom: 6px;
    }

    .option-toggle {
      display: flex;
      justify-content: space-between;
      border: 1px solid #c5cfda;
      padding: 8px;
      background-color: var(--color-white);
    }

    .active {
      background: rgba(197, 207, 218, 0.4);
    }

    .options-toggle-group {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px;
    }

    .option-name {
      font-weight: 600;
      font-size: 12px;
      line-height: 17px;
      white-space: nowrap;
      overflow: hidden;
    }

    .option-percent {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 17px;
    }
  </style>
`;
