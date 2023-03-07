import { css } from "./utils/css";

export const styles = () => {
  css`
    :root {
      --primary: #333333;
      --secondary: #b3b3b3;
      --brand: #18a0fb;

      --input-bg: #ffffff;

      --border: #e6e6e6;

      --font-size-sm: 11px;
      --font-size-md: 12px;
      --font-size-lg: 13px;

      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 600;

      --letter-spacing-sm: 0.005em;
      --letter-spacing-md: 0.01em;

      --size-sm: 4px;
      --size-md: 8px;
      --size-lg: 16px;
      --size-xl: 24px;
      --size-xxl: 28px;

      --radius-sm: 2px;

      --bg-overlay: #1e1e1e;
      --color-text-menu: #ffffff;
      --color-icon-onbrand: rgba(255, 255, 255, 1);
    }

    .figma-dark {
      --primary: #ffffff;
      --secondary: #b3b3b3;
      --brand: #18a0fb;

      --input-bg: #444444;

      --border: #444444;

      color-scheme: dark;
    }

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: transparent;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--brand);
    }

    @font-face {
      font-family: "Inter";
      font-weight: 400;
      font-style: normal;
      src: url("https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.7")
          format("woff2"),
        url("https://rsms.me/inter/font-files/Inter-Regular.woff?v=3.7")
          format("woff");
    }

    @font-face {
      font-family: "Inter";
      font-weight: 500;
      font-style: normal;
      src: url("https://rsms.me/inter/font-files/Inter-Medium.woff2?v=3.7")
          format("woff2"),
        url("https://rsms.me/inter/font-files/Inter-Medium.woff2?v=3.7")
          format("woff");
    }

    @font-face {
      font-family: "Inter";
      font-weight: 600;
      font-style: normal;
      src: url("https://rsms.me/inter/font-files/Inter-SemiBold.woff2?v=3.7")
          format("woff2"),
        url("https://rsms.me/inter/font-files/Inter-SemiBold.woff2?v=3.7")
          format("woff");
    }

    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: "Inter", sans-serif;
      color: var(--primary);
    }

    body,
    body * {
      box-sizing: border-box;
    }

    section {
      display: grid;
      gap: var(--size-sm);
      margin: 0;
      padding: var(--size-md) var(--size-md);
    }

    section > * {
      margin: 0;
      padding: 0;
    }

    footer {
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-sm);
      color: var(--secondary);
      padding: var(--size-lg) var(--size-md);
    }

    a {
      color: var(--brand);
    }

    select,
    input[type="text"],
    textarea {
      width: 100%;
      padding: 0 var(--size-md);
      border: 0;
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-sm);
      color: var(--primary);
      background-color: var(--input-bg);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      appearance: none;
      outline: none;
    }

    select,
    input {
      height: 30px;
    }

    textarea {
      padding: var(--size-md);
      width: 100%;
      resize: none;
      white-space: pre;
      outline: none;
    }

    select:hover,
    textarea:hover,
    input:hover {
      border: 1px solid var(--brand);
    }

    select:focus,
    input:focus,
    textarea:focus {
      border: 1px solid var(--brand);
      outline: 1px solid var(--brand);
      outline-offset: -2px;
    }

    select:disabled,
    input:disabled,
    textarea:disabled {
      border: 1px solid var(--border);
      outline: none;
      opacity: 0.5;
    }

    hr {
      margin: 0;
      padding: 0;
      border: 0;
      border-bottom: 1px solid var(--border);
    }

    .select-box {
      display: grid;
      grid-template-columns: 1fr 30px;
      width: 100%;
    }

    .select-box .select-arrow {
      grid-row: 1;
      grid-column: 2;
      justify-self: center;
      align-self: center;
      pointer-events: none;
      color: var(--secondary);
    }

    .select-box select {
      grid-row: 1;
      grid-column: 1 / -1;
      padding: 0 30px 0 var(--size-md);
    }

    .header {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-lg);
      height: var(--size-xxl);
    }

    .title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--font-letter-spacing-pos-sm);
      line-height: var(--font-line-height);
      color: var(--primary);
    }

    button {
      height: var(--size-xxl);
      background-color: transparent;
      text-decoration: none;
      border: 0;
      outline: none;
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-sm);
      letter-spacing: var(--letter-spacing-sm);
      cursor: pointer;
      color: var(--brand);
    }

    button:active {
      text-decoration: underline;
    }
  `;
};
