import { Stack, Text, TextboxMultiline, Toggle } from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { JSX, h } from "preact";
import { useCallback } from "preact/hooks";

export const ColorMultiple = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange: JSX.GenericEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setConfig({
        colorMultiple: event.currentTarget.value,
      });
    },
    [setConfig]
  );

  const onLoopChange = useCallback(
    (value: boolean) => {
      setConfig({
        colorMultipleLoop: value,
      });
    },
    [setConfig]
  );

  if (config.color !== "multiple") {
    return null;
  }

  return (
    <Stack space="small">
      <Toggle onValueChange={onLoopChange} value={config.colorMultipleLoop}>
        <Text>Loop colors</Text>
      </Toggle>

      <TextboxMultiline
        placeholder="#1e1e1e, --bg-color, --color-${n}"
        value={config.colorMultiple}
        onChange={onChange}
        rows={5}
        variant="border"
        style={{
          whiteSpace: "pre",
        }}
      />
    </Stack>
  );
};
