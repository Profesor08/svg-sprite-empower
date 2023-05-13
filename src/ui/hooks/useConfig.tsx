import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getConfig, updateConfig } from "api/api";
import pretty from "pretty";

const html = pretty(`
  <svg width="{width}" height="{height}" viewBox="0 0 {width} {height}">
    <use href="icons.svg#{name}"></use>
  </svg>
`);

const svg = `{svg}`;

const react = `<Icon name="{name}" width="{width}" height="{height}" />`;

const pug = `+icon({name: "dashboard_24px", width: {width}, height: {height}})`;

export const Context = createContext<IContext>({
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
  update: () => {},
});

export const createConfig = () => {
  const [state, setState] = useState<IConfig>({
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
  });

  const update = useCallback(
    (config: Partial<IConfig>) => {
      setState((state) => ({ ...state, ...config }));
      updateConfig({ ...state, ...config });
    },
    [state]
  );

  const context = useMemo<IContext>(() => {
    return {
      ...state,
      update,
    };
  }, [state, update]);

  useEffect(() => {
    const callback = ({ data: { pluginMessage } }: IFigmaMessageEvent) => {
      if (pluginMessage.type === "getConfig") {
        setState((state) => {
          return {
            ...state,
            ...pluginMessage.config,
            templates: {
              ...state.templates,
              ...pluginMessage.config.templates,
            },
          };
        });
      }
    };

    window.addEventListener("message", callback);

    getConfig();

    return () => window.removeEventListener("message", callback);
  }, []);

  return context;
};

export const useConfig = (): IContext => {
  return useContext(Context);
};
