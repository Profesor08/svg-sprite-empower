import { Bold, Checkbox, Stack, Text } from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { h } from "preact";
import { useCallback } from "preact/hooks";
import { Grid } from "./Grid";

export const Attributes = () => {
  return (
    <Stack space="small">
      <Text>
        <Bold>Attributes</Bold>
      </Text>
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
    </Stack>
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
