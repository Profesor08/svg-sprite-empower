import { css } from "utils/css";

css`
  a {
    color: var(--brand);
  }
`;

export const Link: UI.Link = ({ ...props }) => {
  return <a {...props} />;
};
