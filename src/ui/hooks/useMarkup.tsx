import { useMemo } from "react";
import pretty from "pretty";
import { sprite } from "utils/sprite";
import { useConfig } from "hooks/useConfig";
import { useIcons } from "./useIcons";

export const useMarkup = (): string => {
  const icons = useIcons();
  const config = useConfig();

  return useMemo(() => {
    return pretty(sprite(icons, config));
  }, [config, icons]);
};
