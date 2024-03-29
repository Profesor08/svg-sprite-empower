import pretty from "pretty";
import { api } from "ui/api";
import { sprite } from "ui/utils/sprite";
import { create } from "zustand";
import { useConfig } from "./useConfig";

export const useIcons = create<{
  icons: App.Icon[];
  markup: string;
  size: number;
}>(() => ({
  icons: [],
  markup: "",
  size: 0,
}));

api.on<Api.SelectionHandler>("SELECTION", (entries) => {
  const config = useConfig.getState().config;

  const size = entries.reduce((size, entry) => {
    return size + entry.bytes.length * entry.bytes.BYTES_PER_ELEMENT;
  }, 0);

  const sizeInMb = size / 1024 / 1024;

  const icons = entries.map<App.Icon>((entry) => ({
    id: entry.id,
    name: entry.name,
    width: entry.width,
    height: entry.height,
    svg:
      sizeInMb > config.sizeLimit ? "" : new TextDecoder().decode(entry.bytes),
    size: entry.bytes.length * entry.bytes.BYTES_PER_ELEMENT,
  }));

  const markup =
    sizeInMb > config.sizeLimit
      ? `Render Error: Size exceeds ${config.sizeLimit} mb.`
      : pretty(sprite(icons, config));

  useIcons.setState({
    icons,
    markup: addWhiteSpace(markup, config.whiteSpaceCount),
    size,
  });
});

const addWhiteSpace = (markup: string, whiteSpaceCount: number): string => {
  if (whiteSpaceCount === 0) {
    return markup;
  }

  const whiteSpace = " ".repeat(whiteSpaceCount);

  return markup
    .split("\n")
    .map((line) => (line === "" ? line : `${whiteSpace}${line}`))
    .join("\n");
};
