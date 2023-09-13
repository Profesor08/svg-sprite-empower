import { Bold, Link, Muted, Stack, Text } from "@create-figma-plugin/ui";
import { useIcons } from "hooks/useIcons";
import { h } from "preact";
import { useCallback } from "preact/hooks";
import { copy } from "utils/copy";
import { Grid } from "./Grid";
import { TextboxMultiline } from "./textbox-multiline/TextboxMultiline";

const byteValueNumberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

export const Output = () => {
  const { markup, size } = useIcons();

  const onCopy = useCallback(
    (event: Event) => {
      copy(markup);
      event.preventDefault();
    },
    [markup],
  );

  return (
    <Stack space="extraSmall">
      <Grid columns="1fr auto auto" height={24} gap={12}>
        <Text>
          <Bold>Selection</Bold>
        </Text>
        <Text>
          <Muted>
            <small>size: {byteValueNumberFormatter.format(size)}</small>
          </Muted>
        </Text>
        <Text>
          <Link href="#" onClick={onCopy}>
            <Bold>Copy</Bold>
          </Link>
        </Text>
      </Grid>

      <TextboxMultiline
        rows={10}
        value={markup}
        variant="border"
        readOnly
        style={{
          whiteSpace: "pre",
        }}
      />
    </Stack>
  );
};
