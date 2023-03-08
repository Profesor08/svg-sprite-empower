import cn from "classnames";
import { css } from "utils/css";

css`
  .text {
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-sm);
    color: var(--secondary);
  }
`;

export const Text: UI.Span = ({ className, ...props }) => {
  return <span className={cn("text", className)} {...props} />;
};
