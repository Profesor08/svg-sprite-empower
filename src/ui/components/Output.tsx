import { useCallback } from "react";
import { useSelection } from "hooks/useSelection";
import { copy } from "utils/copy";
import { Button } from "components/layout/Button";
import { Header } from "layout/Header";
import { Textarea } from "form/Textarea";

export const Output = () => {
  const value = useSelection();

  const onCopy = useCallback(() => {
    copy(value);
  }, [value]);

  return (
    <section>
      <Header title="Selection">
        <Button onClick={onCopy}>Copy</Button>
      </Header>
      <Textarea rows={10} value={value} readOnly></Textarea>
    </section>
  );
};
