const root = document.createElement("div");

export const icon = (icon: App.Icon, config: App.Config) => {
  root.innerHTML = icon.svg;

  const svg = root.firstChild as SVGSVGElement;

  const symbol = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "symbol",
  );

  if (config.attributes.id === true) {
    symbol.setAttribute("id", icon.name);
  }

  if (config.attributes.width === true) {
    symbol.setAttribute("width", icon.width.toString());
  }

  if (config.attributes.height === true) {
    symbol.setAttribute("height", icon.height.toString());
  }

  if (config.attributes.viewBox === true) {
    symbol.setAttribute("viewBox", `0 0 ${icon.width} ${icon.height}`);
  }

  if (config.attributes.fill === true) {
    symbol.setAttribute("fill", "none");
  }

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
        config.colorMultipleLoop,
      );
      break;
    case "remove":
      removeColor(symbol);
      break;
  }

  return symbol.outerHTML;
};

const colorAttributes = ["stroke", "fill"];
const colorAttributesSelector = colorAttributes
  .map((attr) => `[${attr}]`)
  .join(", ");

const overrideColor = (
  symbol: SVGSymbolElement,
  colorGetter: () => string | undefined,
) => {
  symbol.querySelectorAll(colorAttributesSelector).forEach((entry) => {
    for (const attribute of Array.from(entry.attributes)) {
      if (
        colorAttributes.includes(attribute.name) &&
        attribute.value !== "none"
      ) {
        const color = colorGetter();

        if (color !== undefined) {
          entry.setAttribute(attribute.name, color);
        }
      }
    }
  });
};

const overrideColorMultiple = (
  symbol: SVGSymbolElement,
  colorsInput: string,
  loop: boolean = false,
) => {
  const colors = colorsInput
    .split(/[\s\n;,](?![^()]*\))/g)
    .map((color) => color.trim())
    .filter((color) => color.length > 0);

  const pickColor = colorLoop(colors, loop);

  overrideColor(symbol, () => pickColor.next().value);
};

function* colorLoop(
  colors: string[],
  loop: boolean = false,
): Generator<string, undefined> {
  let index = 0;

  do {
    for (const color of colors) {
      const isWithVariable = color.includes("${n}");

      yield isWithVariable === true
        ? color.replace("${n}", (++index).toString())
        : color;
    }
  } while (loop === true && colors.length > 0);
}

const removeColor = (symbol: SVGSymbolElement) => {
  symbol.querySelectorAll(colorAttributesSelector).forEach((entry) => {
    for (const colorAttribute of colorAttributes) {
      const attribute = entry.attributes.getNamedItem(colorAttribute);

      if (attribute !== null && attribute.value !== "none") {
        entry.attributes.removeNamedItem(colorAttribute);
      }
    }
  });
};
