import clsx from "clsx";
import "./label.scss";

export const Label: FC<
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & {
    space?: Space;
  }
> = ({ className, space, ...props }) => {
  return <label className={clsx("label", space, className)} {...props}></label>;
};
