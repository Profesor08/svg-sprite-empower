import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

hljs.highlightAll();

export const html = (code: string) => {
  return hljs.highlight(code, { language: "xml" }).value;
};
