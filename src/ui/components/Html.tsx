import { h } from "preact";
import { html } from "utils/highlight";

export const Html: FC<{
  code: string;
}> = ({ code }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: html(code),
      }}
    />
  );
};
