import cn from "classnames";
import { css } from "utils/css";

css`
  .label {
    color: var(--secondary);
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-sm);
  }
`;

export const Label: UI.Span = ({ className, ...props }) => {
  return <span className={cn("label", className)} {...props} />;
};
