import { useCallback } from "react";
import { useSelection } from "../hooks/useSelection";
import { copy } from "../utils/copy";
import { Header } from "./Header";

export const Output = () => {
  const value = useSelection();

  const onCopy = useCallback(() => {
    copy(value);
  }, [value]);

  return (
    <section>
      <Header title="Selection">
        <button onClick={onCopy}>Copy</button>
      </Header>
      <textarea rows={10} value={value} readOnly></textarea>
    </section>
  );
};
