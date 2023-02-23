import pretty from "pretty";

export const onPretty = (markup: string) => {
  figma.ui.postMessage({
    type: "onPretty",
    markup: pretty(markup),
  });
};
