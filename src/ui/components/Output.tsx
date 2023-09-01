import {
  Bold,
  Link,
  Stack,
  Text,
  TextboxMultiline,
} from "@create-figma-plugin/ui";
import { useMarkup } from "hooks/useMarkup";
import { h } from "preact";
import { useCallback } from "preact/hooks";
import { copy } from "utils/copy";
import { Grid } from "./Grid";

export const Output = () => {
  const value = useMarkup();

  const onCopy = useCallback(
    (event: Event) => {
      copy(value);
      event.preventDefault();
    },
    [value]
  );

  return (
    <Stack space="extraSmall">
      <Grid>
        <Text>
          <Bold>Selection</Bold>
        </Text>
        <Text>
          <Link href="#" onClick={onCopy}>
            <Bold>Copy</Bold>
          </Link>
        </Text>
      </Grid>

      <TextboxMultiline
        rows={10}
        value={value}
        variant="border"
        readOnly
        style={{
          whiteSpace: "pre",
        }}
      />
    </Stack>
  );
};
