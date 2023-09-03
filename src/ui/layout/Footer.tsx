import { Divider, Link, Muted, Stack, Text } from "@create-figma-plugin/ui";
import { h } from "preact";

export const Footer = () => {
  return (
    <Stack space="medium">
      <Divider />
      <Text>
        <Muted>Developed by: </Muted>
        <Link href="https://github.com/Profesor08" target="_blank">
          Profesor08
        </Link>
      </Text>
    </Stack>
  );
};
