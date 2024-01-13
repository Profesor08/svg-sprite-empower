import clsx from "clsx";
import "./grid.scss";

export const Grid: FC<{
  space?: Space;
  x?: Space;
  y?: Space;
  columns?: string;
  align?: React.CSSProperties["alignItems"];
}> = ({ space, x, y, columns, align, children }) => {
  return (
    <div
      className={clsx("grid", space, x && `x-${x}`, y && `y-${y}`)}
      style={{
        gridTemplateColumns: columns,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
};
