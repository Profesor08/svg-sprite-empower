import { on } from "@create-figma-plugin/utilities";
import { create } from "zustand";

export const useIcons = create<{
  icons: App.Icon[];
}>(() => ({
  icons: [],
}));

on<Api.SelectionHandler>("SELECTION", (entries) => {
  useIcons.setState({
    icons: entries,
  });
});
