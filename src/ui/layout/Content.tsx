import {
  Bold,
  SegmentedControl,
  SegmentedControlOption,
  Stack,
  Text,
} from "@create-figma-plugin/ui";
import { ColorMode } from "components/ColorMode";
import { ColorMultiple } from "components/ColorMultiple";
import { ColorOverride } from "components/ColorOverride";
import { Config } from "components/Config";
import { Help } from "components/Help";
import { Output } from "components/Output";
import { Templates } from "components/Templates";
import { useCallback, useState } from "preact/hooks";

export const Content = () => {
  const options: Array<SegmentedControlOption> = [
    {
      value: "Selection",
    },
    {
      value: "Templates",
    },
    {
      value: "Help",
    },
  ];

  const [value, setValue] =
    useState<SegmentedControlOption["value"]>("Selection");

  const onChange = useCallback((value: string) => {
    const newValue = value;

    setValue(newValue);
  }, []);

  return (
    <Stack space="small">
      <SegmentedControl
        onValueChange={onChange}
        options={options}
        value={value}
      />

      {value === "Selection" && (
        <Stack space="small">
          <Output />

          <Text>
            <Bold>Color</Bold>
          </Text>

          <ColorMode />

          <ColorOverride />

          <ColorMultiple />

          <Config />
        </Stack>
      )}

      {value === "Templates" && <Templates />}

      {value === "Help" && <Help />}
    </Stack>
  );
};
