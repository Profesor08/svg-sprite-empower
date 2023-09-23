import { Props } from "@create-figma-plugin/ui";
import { ComponentChildren, JSX } from "preact";
import { useMemo } from "preact/hooks";

const gridStyle: JSX.CSSProperties = {
  display: "grid",
  alignItems: "center",
};

interface GridProps {
  children: ComponentChildren;
  columns?: string;
  height?: number | "auto";
  gap?: number | [number, number];
}

export const Grid = ({
  columns,
  height,
  gap,
  ...props
}: Props<HTMLDivElement, GridProps>) => {
  const style: JSX.CSSProperties = useMemo(() => {
    return {
      ...gridStyle,
      gridTemplateColumns: columns,
      height,
      gap: createGap(gap),
    };
  }, [columns, gap, height]);

  return <div style={style} {...props}></div>;
};

const createGap = (
  gap?: number | [number, number],
): `${string}px` | `${string}px ${string}px` | undefined => {
  if (gap === undefined) {
    return undefined;
  }

  if (typeof gap === "number") {
    return `${gap}px`;
  }

  return `${gap[0]}px ${gap[1]}px`;
};
