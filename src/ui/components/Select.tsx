import { useConfig } from "../hooks/useConfig";
import { useCallback } from "react";

export const Select = () => {
  const config = useConfig();

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      config.update({
        color: event.currentTarget.value as IColorType,
      });
    },
    [config.update]
  );

  return (
    <div className="select-box">
      <select value={config.color} onChange={onChange}>
        <option value="currentColor">currentColor</option>
        <option value="override">override</option>
        {/* <option value="multiple">multiple</option> */}
        <option value="initial">initial</option>
        <option value="remove">remove</option>
      </select>
      <svg
        className="select-arrow"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <use href="#arrow_down_24px"></use>
      </svg>
    </div>
  );
};
