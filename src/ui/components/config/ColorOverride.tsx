import { Input } from "antd";
import { useCallback } from "react";
import { useConfig } from "ui/hooks/useConfig";

export const ColorOverride = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setConfig({
        colorOverride: event.currentTarget.value,
      });
    },
    [setConfig],
  );

  return (
    <Input
      placeholder="#000000"
      value={config.colorOverride}
      onChange={onChange}
      bordered
    />
  );
};
