import { useState, useEffect } from "react";
import pretty from "pretty";
import { sprite } from "../utils/sprite";
import { getFigmaSelection } from "../api/api";
import { useConfig } from "./useConfig";

export const useSelection = (): string => {
  const [markup, setMarkup] = useState("");
  const config = useConfig();

  useEffect(() => {
    const callback = ({ data: { pluginMessage } }: IFigmaMessageEvent) => {
      if (pluginMessage.type === "selectionChange") {
        setMarkup(pretty(sprite(pluginMessage.entries, config)));
      }
    };

    window.addEventListener("message", callback);

    getFigmaSelection();

    return () => window.removeEventListener("message", callback);
  }, [config]);

  return markup;
};
