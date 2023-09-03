import { useConfig } from "hooks/useConfig";
import { useMemo } from "preact/hooks";
import pretty from "pretty";
import { sprite } from "utils/sprite";
import { useIcons } from "./useIcons";

export const useMarkup = (): string => {
  const icons = useIcons((state) => state.icons);
  const config = useConfig((state) => state.config);

  return useMemo(() => {
    return pretty(sprite(icons, config));
  }, [config, icons]);
};
