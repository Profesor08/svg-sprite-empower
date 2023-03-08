import { css } from "utils/css";
import { Title } from "layout/Title";

css`
  .header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    gap: var(--size-lg);
    height: var(--size-xxl);
  }
`;

interface IHeader {
  title: string;
}

export const Header: FC<IHeader> = ({ title, children }) => {
  return (
    <div className="header">
      <Title>{title}</Title>
      {children}
    </div>
  );
};
