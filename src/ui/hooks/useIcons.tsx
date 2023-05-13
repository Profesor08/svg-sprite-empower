import { useEffect, useState } from "react";
import { getFigmaSelection } from "api/api";

export const useIcons = () => {
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const callback = ({ data: { pluginMessage } }: IFigmaMessageEvent) => {
      if (pluginMessage.type === "selectionChange") {
        setIcons(pluginMessage.entries);
      }
    };

    window.addEventListener("message", callback);

    getFigmaSelection();

    return () => window.removeEventListener("message", callback);
  }, []);

  return icons;
};
