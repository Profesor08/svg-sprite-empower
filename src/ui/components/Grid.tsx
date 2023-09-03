import { Props } from "@create-figma-plugin/ui";
import { ComponentChildren, JSX, h } from "preact";

const style: JSX.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  justifyContent: "space-between",
  alignItems: "center",
  height: "24px",
};

interface GridProps {
  children: ComponentChildren;
}

export const Grid = (props: Props<HTMLDivElement, GridProps>) => {
  return <div style={style} {...props}></div>;
};
