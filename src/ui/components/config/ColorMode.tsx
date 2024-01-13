import { Select } from "antd";
import { useCallback } from "react";
import { useConfig } from "ui/hooks/useConfig";

const options = [
  { value: "currentColor" },
  { value: "override" },
  { value: "multiple" },
  { value: "initial" },
  { value: "remove" },
];

export const ColorMode = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange = useCallback(
    (color: App.Color.Type) => {
      setConfig({
        color,
      });
    },
    [setConfig],
  );

  return <Select value={config.color} onChange={onChange} options={options} />;
};
