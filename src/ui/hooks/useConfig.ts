import { emit, on } from "@create-figma-plugin/utilities";
import pretty from "pretty";
import { create } from "zustand";

const html = pretty(`
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}">
    <use href="icons.svg#{name}"></use>
  </svg>
`);

const svg = `{svg}`;

const react = `<Icon name="{name}" width="{width}" height="{height}" />`;

const pug = `+icon({name: "dashboard_24px", width: {width}, height: {height}})`;

interface UseConfigStore {
  config: App.Config;
  setConfig(config: Partial<App.Config>): void;
}

export const useConfig = create<UseConfigStore>((set, get) => ({
  config: {
    color: "currentColor",
    colorOverride: "#000000",
    colorMultiple: "",
    colorMultipleLoop: true,
    selectedTemplate: "html",
    templates: {
      html,
      svg,
      react,
      pug,
    },
  },
  setConfig: (config) => {
    const state = get().config;
    const newConfig = configSetter(state, config);

    set({
      config: newConfig,
    });

    emit<Api.SetConfigHandler>("SET_CONFIG", newConfig);
  },
}));

on<Api.GetConfigHandler>("GET_CONFIG", (config) => {
  useConfig.setState((state) => ({
    config: configSetter(state.config, config),
  }));
});

const configSetter = (
  state: App.Config,
  config: Partial<App.Config>,
): App.Config => {
  return {
    ...state,
    ...config,
    templates: {
      ...state.templates,
      ...config.templates,
    },
  };
};
