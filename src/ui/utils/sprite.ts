import { icon } from "utils/icon";

export const sprite = (icons: App.Icon[], config: App.Config) => {
  if (icons.length === 0) {
    return "";
  }

  const content = icons.map((entry) => icon(entry, config)).join(`\n\n  `);

  return `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};
