import { useCallback } from "react";
import { useConfig } from "hooks/useConfig";
import { css } from "utils/css";

css`
  select {
    width: 100%;
    padding: 0 var(--size-md);
    border: 0;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-sm);
    letter-spacing: var(--letter-spacing-sm);
    color: var(--primary);
    background-color: var(--input-bg);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    appearance: none;
    outline: none;
  }

  select {
    height: 30px;
  }

  select:hover {
    border: 1px solid var(--brand);
  }

  select:focus {
    border: 1px solid var(--brand);
    outline: 1px solid var(--brand);
    outline-offset: -2px;
  }

  select:disabled {
    border: 1px solid var(--border);
    outline: none;
    opacity: 0.5;
  }

  .select-box {
    display: grid;
    grid-template-columns: 1fr 30px;
    width: 100%;
  }

  .select-box .select-arrow {
    grid-row: 1;
    grid-column: 2;
    justify-self: center;
    align-self: center;
    pointer-events: none;
    color: var(--secondary);
  }

  .select-box select {
    grid-row: 1;
    grid-column: 1 / -1;
    padding: 0 30px 0 var(--size-md);
  }
`;

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
        <option value="multiple">multiple</option>
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
