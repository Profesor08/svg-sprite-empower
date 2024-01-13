import { Typography } from "antd";
import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import { useMemo } from "react";
import "./code.scss";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

export const highlight = (code: string) => {
  return hljs.highlight(code, { language: "xml" }).value;
};

export const Code: FC<{
  code: string;
  type?: "html";
  block?: boolean;
}> = ({ code, type, block }) => {
  const codeNode = useMemo(() => {
    switch (type) {
      case "html":
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: highlight(code.trim()),
            }}
          />
        );
    }

    return <>{code.trim()}</>;
  }, []);

  return (
    <Typography.Text className={clsx("code", type, block && "block")} code>
      {codeNode}
    </Typography.Text>
  );
};
