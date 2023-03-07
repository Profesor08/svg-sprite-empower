type TemplateStringsInterpolation = string | number | boolean | null;

const interpolate = (interpolation: TemplateStringsInterpolation) => {
  switch (typeof interpolation) {
    case "boolean":
      return interpolation.toString();
    case "number":
      return interpolation.toString();
    case "string":
      return interpolation;
  }
  return null;
};

const parse = (
  strings: TemplateStringsArray,
  ...interpolations: (TemplateStringsInterpolation | undefined)[]
) => {
  return strings
    .map((str, i) => {
      const interpolation = interpolations[i];

      return interpolation !== undefined
        ? `${str}${interpolate(interpolation)}`
        : str;
    })
    .join("");
};

export const css = (
  strings: TemplateStringsArray,
  ...interpolations: TemplateStringsInterpolation[]
) => {
  const sheet = new CSSStyleSheet();

  sheet.replaceSync(parse(strings, ...interpolations));

  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
};
