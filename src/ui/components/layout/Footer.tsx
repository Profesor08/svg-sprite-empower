import { css } from "utils/css";
import { Link } from "layout/Link";
import { Text } from "layout/Text";

css`
  footer {
    padding: var(--size-lg) var(--size-md);
  }
`;

export const Footer = () => {
  return (
    <footer>
      <Text>
        Developed by:{" "}
        <Link href="https://github.com/Profesor08" target="_blank">
          Profesor08
        </Link>
      </Text>
    </footer>
  );
};
