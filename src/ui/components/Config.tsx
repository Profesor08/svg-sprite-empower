import {
  Bold,
  Disclosure,
  RangeSlider,
  Stack,
  Text,
} from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { JSX, h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Attributes } from "./Attributes";
import { Grid } from "./Grid";

export const Config = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen: JSX.MouseEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setOpen(event?.currentTarget.checked);
    },
    [],
  );

  return (
    <Disclosure onClick={onOpen} open={open} title="Config">
      <Stack space="large">
        <Attributes />
        <SizeLimit />
      </Stack>
    </Disclosure>
  );
};

const SizeLimit = () => {
  const minimum = 0;
  const maximum = 100;
  const increment = 1;
  const sizeLimit = useConfig((state) => state.config.sizeLimit);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange = useCallback(
    (value: string) => {
      setConfig({
        sizeLimit: parseInt(value),
      });
    },
    [setConfig],
  );

  return (
    <Stack space="small">
      <Text>
        <Bold>Size limit:</Bold>
      </Text>
      <Stack space="extraSmall">
        <Grid columns="auto 1fr auto">
          <Text>{minimum}mb</Text>
          <Text align="center">{sizeLimit}mb</Text>
          <Text>{maximum}mb</Text>
        </Grid>
        <RangeSlider
          minimum={minimum}
          maximum={maximum}
          increment={increment}
          onValueInput={onChange}
          value={sizeLimit.toString()}
        />
      </Stack>
    </Stack>
  );
};
