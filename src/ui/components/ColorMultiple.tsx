import { useCallback } from "react";
import { useConfig } from "../hooks/useConfig";

export const ColorMultiple = () => {
  const config = useConfig();

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      config.update({
        colorMultiple: event.currentTarget.value,
      });
    },
    []
  );

  return (
    <>
      {config.color === "multiple" && (
        <textarea
          rows={7}
          placeholder="#1e1e1e, --bg-color, --color-${n}"
          value={config.colorMultiple}
          onChange={onChange}
        ></textarea>
      )}
    </>
  );
};
