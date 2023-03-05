import { useConfig } from "../hooks/useConfig";
import { useCallback } from "react";

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
        <input
          type="input"
          placeholder="#000000"
          value={config.colorOverride}
          onChange={onChange}
        />
      )}
    </>
  );
};
