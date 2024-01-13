import clsx from "clsx";
import { forwardRef } from "react";
import { LinkProps, Link as RouterLink } from "react-router-dom";
import "./link.scss";

export const Link = forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
  ({ className, to, ...props }, ref) => {
    if (to !== undefined) {
      return (
        <RouterLink
          ref={ref}
          to={to}
          className={clsx("link", className)}
          {...props}
        />
      );
    }

    return <a ref={ref} className={clsx("link", className)} {...props} />;
  },
);
