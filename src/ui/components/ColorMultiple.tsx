import { useCallback } from "react";
import { useConfig } from "../hooks/useConfig";
import { Switch } from "./Switch";

export const ColorMultiple = () => {
  const config = useConfig();

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      config.update({
        colorMultiple: event.currentTarget.value,
      });
    },
    [config]
  );

  const onLoopChange = useCallback(
    (value: boolean) => {
      config.update({
        colorMultipleLoop: value,
      });
    },
    [config]
  );

  return (
    <>
      {config.color === "multiple" && (
        <>
          <Switch
            checked={config.colorMultipleLoop}
            onChange={onLoopChange}
            label="Loop colors"
          />
          <textarea
            rows={7}
            placeholder="#1e1e1e, --bg-color, --color-${n}"
            value={config.colorMultiple}
            onChange={onChange}
          ></textarea>
        </>
      )}
    </>
  );
};
