import { css } from "utils/css";

css`
  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid var(--border);
  }
`;

export const Line = () => {
  return <hr />;
};
