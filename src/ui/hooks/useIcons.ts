import { on } from "@create-figma-plugin/utilities";
import pretty from "pretty";
import { sprite } from "utils/sprite";
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

on<Api.SelectionHandler>("SELECTION", (entries) => {
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
    markup,
    size,
  });
});
