import { useCallback } from "react";

export const Switch: FC<{
  checked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}> = ({ checked = false, onChange, label }) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange?.(event.currentTarget.checked);
    },
    []
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={onInputChange}
        checked={checked}
        hidden
      />
      <span className="switch-toggle"></span>
      {label && <span className="switch-label">{label}</span>}
    </label>
  );
};
