const root = document.createElement("div");

const overrideColor = (symbol: SVGSymbolElement, color: string) => {
  symbol.querySelectorAll("[stroke]").forEach((entry) => {
    if (entry.getAttribute("stroke") !== "none") {
      entry.setAttribute("stroke", color);
    }
  });

  symbol.querySelectorAll("[fill]").forEach((entry) => {
    if (entry.getAttribute("fill") !== "none") {
      entry.setAttribute("fill", color);
    }
  });
};

const removeColor = (symbol: SVGSymbolElement) => {
  symbol.querySelectorAll("[stroke]").forEach((entry) => {
    if (entry.getAttribute("stroke") !== "none") {
      entry.removeAttribute("stroke");
    }
  });

  symbol.querySelectorAll("[fill]").forEach((entry) => {
    if (entry.getAttribute("fill") !== "none") {
      entry.removeAttribute("fill");
    }
  });
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
      overrideColor(symbol, "currentColor");
      break;
    case "remove":
      removeColor(symbol);
      break;
    case "override":
      overrideColor(symbol, config.colorOverride);
      break;
  }

  return symbol.outerHTML;
};
