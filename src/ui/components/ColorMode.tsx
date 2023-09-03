import { Dropdown } from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { JSX, h } from "preact";
import { useCallback, useMemo } from "preact/hooks";

export const ColorMode = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange: JSX.GenericEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setConfig({
        color: event.currentTarget.value as App.Color.Type,
      });
    },
    [setConfig],
  );

  const options = useMemo(() => {
    return [
      { value: "currentColor" },
      { value: "override" },
      { value: "multiple" },
      { value: "initial" },
      { value: "remove" },
    ];
  }, []);

  return (
    <Dropdown
      onChange={onChange}
      options={options}
      value={config.color}
      variant="border"
    />
  );
};
