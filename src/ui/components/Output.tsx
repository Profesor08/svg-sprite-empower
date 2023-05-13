import { useCallback } from "react";
import { useMarkup } from "hooks/useMarkup";
import { copy } from "utils/copy";
import { Button } from "components/layout/Button";
import { Header } from "layout/Header";
import { Textarea } from "form/Textarea";
import { Section } from "./layout/Section";
import { Title } from "./layout/Title";

export const Output = () => {
  const value = useMarkup();

  const onCopy = useCallback(() => {
    copy(value);
  }, [value]);

  return (
    <Section>
      <Header>
        <Title>Selection</Title>
        <Button onClick={onCopy}>Copy</Button>
      </Header>
      <Textarea rows={10} value={value} readOnly></Textarea>
    </Section>
  );
};
