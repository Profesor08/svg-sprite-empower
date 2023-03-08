import { css } from "utils/css";

css`
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
`;

export const Section: UI.Section = ({ ...props }) => {
  return <section {...props} />;
};
