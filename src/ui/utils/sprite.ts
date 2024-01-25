import { icon } from "./icon";

export const sprite = (icons: App.Icon[], config: App.Config): string => {
  if (icons.length === 0) {
    return "";
  }

  const content = icons.map((entry) => icon(entry, config)).join(`\n\n  `);

  if (config.includeSvgElement === true) {
    return `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  return content;
};
