import { css } from "utils/css";

css`
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

export const Button: UI.Button = ({ ...props }) => {
  return <button {...props} />;
};
