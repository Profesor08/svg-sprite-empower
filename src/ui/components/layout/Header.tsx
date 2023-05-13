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

export const Header: FC = ({ children }) => {
  return (
    <div className="header">
      {children}
    </div>
  );
};
