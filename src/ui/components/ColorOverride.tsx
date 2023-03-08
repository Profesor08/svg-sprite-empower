import { useConfig } from "hooks/useConfig";
import { useCallback } from "react";
import { Input } from "form/Input";

export const ColorOverride = () => {
  const config = useConfig();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      config.update({
        colorOverride: event.currentTarget.value,
      });
    },
    []
  );

  return (
    <>
      {config.color === "override" && (
        <Input
          type="text"
          placeholder="#000000"
          value={config.colorOverride}
          onChange={onChange}
        />
      )}
    </>
  );
};
