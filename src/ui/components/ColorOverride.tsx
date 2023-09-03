import { Textbox } from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { JSX, h } from "preact";
import { useCallback } from "preact/hooks";

export const ColorOverride = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setConfig({
        colorOverride: event.currentTarget.value,
      });
    },
    [setConfig],
  );

  if (config.color !== "override") {
    return null;
  }

  return (
    <Textbox
      placeholder="#000000"
      value={config.colorOverride}
      onChange={onChange}
      variant="border"
    />
  );
};
