import clsx from "clsx";
import { forwardRef } from "react";
import "./container.scss";

export const Container = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    x?: Space;
    y?: Space;
  }>
>(({ x, y, children }, ref) => {
  return (
    <div ref={ref} className={clsx("container", x && `x-${x}`, y && `y-${y}`)}>
      {children}
    </div>
  );
});
