import merge from "lodash/merge";
import pretty from "pretty";
import { api } from "ui/api";
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
  setAttributes(attributes: Partial<App.Config["attributes"]>): void;
}

export const useConfig = create<UseConfigStore>((set) => ({
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
    attributes: {
      id: true,
      width: false,
      height: false,
      viewBox: true,
      fill: true,
    },
    sizeLimit: 4,
    includeSvgElement: true,
    whiteSpaceCount: 0,
  },
  setConfig: (config) => {
    set((state) => ({
      config: merge({}, state.config, config),
    }));
  },
  setAttributes: (attributes) => {
    set((state) => ({
      config: {
        ...state.config,
        attributes: {
          ...state.config.attributes,
          ...attributes,
        },
      },
    }));
  },
}));

api.on<Api.GetConfigHandler>("GET_CONFIG", (config) => {
  useConfig.setState((state) => ({
    config: merge({}, state.config, config),
  }));
});

useConfig.subscribe((state) => {
  api.emit<Api.SetConfigHandler>("SET_CONFIG", state.config);
});
