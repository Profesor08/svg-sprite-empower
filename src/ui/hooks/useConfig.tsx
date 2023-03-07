import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getConfig, updateConfig } from "../api/api";

export const Context = createContext<IContext>({
  color: "currentColor",
  colorOverride: "#000000",
  colorMultiple: "",
  colorMultipleLoop: true,
  update: () => {},
});

export const createConfig = () => {
  const [state, setState] = useState<IConfig>({
    color: "currentColor",
    colorOverride: "#000000",
    colorMultiple: "",
    colorMultipleLoop: true,
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
        setState((state) => ({ ...state, ...pluginMessage.config }));
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
