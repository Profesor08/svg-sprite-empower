import cn from "classnames";
import { css } from "utils/css";

css`
  .title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--font-letter-spacing-pos-sm);
    line-height: var(--font-line-height);
    color: var(--primary);
  }
`;

export const Title: UI.Div = ({ className, ...props }) => {
  return <div className={cn("title", className)} {...props} />;
};
