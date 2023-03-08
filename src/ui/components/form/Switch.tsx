import { useCallback } from "react";
import { css } from "utils/css";
import { Label } from "layout/Label";

css`
  .switch {
    justify-self: start;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    gap: 8px;
    padding: var(--size-md) var(--size-sm);
  }

  .switch .switch-toggle {
    background-color: red;
    width: 24px;
    height: 12px;
    border-radius: 12px;
    background-image: linear-gradient(
      90deg,
      var(--brand) 0px 24px,
      var(--secondary) 24px 48px
    );
    background-position: -24px;
    background-repeat: no-repeat;
    background-size: 200% 100%;
    background-clip: padding-box;
    transition: background-position 0.1s ease-out;
    padding: 1px;
  }

  .switch .switch-toggle::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-icon-onbrand);
    transition: transform 0.1s ease-out;
  }

  .switch input:checked ~ .switch-toggle {
    background-position: 0;
  }

  .switch input:checked ~ .switch-toggle::before {
    transform: translateX(12px);
  }
`;

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
      {label && <Label>{label}</Label>}
    </label>
  );
};
