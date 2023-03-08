import { css } from "utils/css";

css`
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

  textarea {
    padding: var(--size-md);
    width: 100%;
    resize: none;
    white-space: pre;
    outline: none;
  }

  textarea:hover {
    border: 1px solid var(--brand);
  }

  textarea:focus {
    border: 1px solid var(--brand);
    outline: 1px solid var(--brand);
    outline-offset: -2px;
  }

  textarea:disabled {
    border: 1px solid var(--border);
    outline: none;
    opacity: 0.5;
  }
`;

export const Textarea: UI.Textarea = ({ ...props }) => {
  return <textarea {...props} />;
};
