const root = document.createElement("div");

const overrideSymbolColor = (
  symbol: SVGSymbolElement,
  attribute: "stroke" | "fill",
  colorGetter: () => string | null
) => {
  symbol.querySelectorAll(`[${attribute}]`).forEach((entry) => {
    if (entry.getAttribute(attribute) !== "none") {
      const color = colorGetter();

      if (color !== null) {
        entry.setAttribute(attribute, color);
      }
    }
  });
};

const removeSymbolColor = (
  symbol: SVGSymbolElement,
  attribute: "stroke" | "fill"
) => {
  symbol.querySelectorAll(`[${attribute}]`).forEach((entry) => {
    if (entry.getAttribute(attribute) !== "none") {
      entry.removeAttribute(attribute);
    }
  });
};

const overrideColor = (
  symbol: SVGSymbolElement,
  colorGetter: () => string | null
) => {
  overrideSymbolColor(symbol, "stroke", colorGetter);
  overrideSymbolColor(symbol, "fill", colorGetter);
};

function* colorLoop(
  items: string[],
  loop: boolean = false
): Generator<string, null> {
  do {
    for (let index = 0; index < items.length; index++) {
      yield items[index].replace("${n}", (index + 1).toString());
    }
  } while (loop === true && items.length > 0);

  return null;
}

const overrideColorMultiple = (
  symbol: SVGSymbolElement,
  colorsInput: string,
  loop: boolean = false
) => {
  const colors = colorsInput
    .split(/[,:\s]/)
    .map((color) => color.trim())
    .filter((color) => color.length > 0);

  const pickColor = colorLoop(colors, loop);

  overrideColor(symbol, () => pickColor.next().value);
};

const removeColor = (symbol: SVGSymbolElement) => {
  removeSymbolColor(symbol, "stroke");
  removeSymbolColor(symbol, "fill");
};

export const icon = (icon: Icon, config: IConfig) => {
  root.innerHTML = icon.svg;

  const svg = root.firstChild as SVGSVGElement;

  const symbol = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "symbol"
  );

  symbol.setAttribute("id", icon.name);
  symbol.setAttribute("width", icon.width.toString());
  symbol.setAttribute("height", icon.height.toString());
  symbol.setAttribute("viewBox", `0 0 ${icon.width} ${icon.height}`);
  symbol.setAttribute("fill", "none");

  symbol.innerHTML = svg.innerHTML.trim();

  switch (config.color) {
    case "currentColor":
      overrideColor(symbol, () => "currentColor");
      break;
    case "override":
      overrideColor(symbol, () => config.colorOverride);
      break;
    case "multiple":
      overrideColorMultiple(
        symbol,
        config.colorMultiple,
        config.colorMultipleLoop
      );
      break;
    case "remove":
      removeColor(symbol);
      break;
  }

  return symbol.outerHTML;
};
