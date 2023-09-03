import { Checkbox, Disclosure, Stack, Text } from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { JSX, h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Grid } from "./Grid";

export const Attributes = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen: JSX.MouseEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setOpen(event?.currentTarget.checked);
    },
    [],
  );

  return (
    <Disclosure onClick={onOpen} open={open} title="Attributes">
      <Stack space="medium">
        <Grid columns="1fr 1fr 1fr">
          <Attribute name="width" />
          <Attribute name="height" />
          <Attribute name="viewBox" />
        </Grid>
        <Grid columns="1fr 1fr 1fr">
          <Attribute name="id" />
          <Attribute name="fill" />
        </Grid>
      </Stack>
    </Disclosure>
  );
};

const Attribute = ({ name }: { name: keyof App.Config["attributes"] }) => {
  const attribute = useConfig((state) => state.config.attributes[name]);
  const setAttributes = useConfig((state) => state.setAttributes);

  const onChange = useCallback(
    (value: boolean) => {
      setAttributes({
        [name]: value,
      });
    },
    [name, setAttributes],
  );

  return (
    <Checkbox onValueChange={onChange} value={attribute}>
      <Text>{name}</Text>
    </Checkbox>
  );
};
