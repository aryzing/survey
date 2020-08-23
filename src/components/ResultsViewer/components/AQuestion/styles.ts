import { html } from "lit-html";

// eslint-disable-next-line import/prefer-default-export
export const styles = html`
  <style>
    .container {
      background-color: var(--color-white);
      width: 254px;
      border: 1px solid var(--color-silver);
    }

    .question-title-container {
      padding: 24px;
      text-align: center;
    }

    .question-title {
      font-size: 12px;
      line-height: 17px;
    }

    .question-type-container {
      border-top: 1px solid var(--color-silver);
      text-align: center;
      padding-top: 17px;
      padding-bottom: 13px;
    }

    .question-type {
      font-size: 13px;
      line-height: 17px;
      color: var(--color-storm);
    }

    .results-container {
      display: grid;
      gap: 1px;
      border: 1px solid var(--color-silver);
    }

    .hack-for-grid-lines {
      background-color: var(--color-silver);
      margin: 16px;
    }

    .hack-for-grid-lines .white-background {
      background-color: var(--color-white);
    }

    .row-container {
      position: relative;
    }

    .answer-text-container {
      display: flex;
      justify-content: space-between;
      padding: 12px 8px;

      position: relative;
      z-index: 10;
    }

    .answer-text {
      font-weight: 600;
      font-size: 12px;
      line-height: 17px;
    }

    .percent {
      font-size: 12px;
      line-height: 17px;
      font-weight: 600;
    }

    .line {
      position: absolute;
      border-right: 1px dashed black;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 3;
    }

    .bar {
      position: absolute;
      background: rgba(197, 207, 218, 0.2);
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    }

    .white-background {
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
    }
  </style>
`;
