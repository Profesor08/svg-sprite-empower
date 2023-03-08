import { css } from "utils/css";

const types = ["text"];

for (const type of types) {
  css`
    input[type="${type}"] {
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

    input[type="${type}"] {
      height: 30px;
    }

    input[type="${type}"]:hover {
      border: 1px solid var(--brand);
    }

    input[type="${type}"]:focus {
      border: 1px solid var(--brand);
      outline: 1px solid var(--brand);
      outline-offset: -2px;
    }

    input[type="${type}"]:disabled {
      border: 1px solid var(--border);
      outline: none;
      opacity: 0.5;
    }
  `;
}

export const Input: UI.Input = ({ ...props }) => {
  return <input {...props} />;
};
