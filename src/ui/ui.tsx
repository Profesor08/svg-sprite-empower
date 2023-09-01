import "!./styles/global.css";
import "!./styles/scrollbar.css";
import {
  Container,
  Stack,
  VerticalSpace,
  render,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { useResize } from "hooks/useResize";
import { h } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { Content } from "./layout/Content";
import { Footer } from "./layout/Footer";

function Plugin() {
  const ref = useRef<HTMLDivElement>(null);

  useResize(
    window["create-figma-plugin"],
    useCallback((width, height) => {
      const scrollGlitch = 0;

      emit<Api.ResizeHandler>("RESIZE", 300, height + scrollGlitch);
    }, [])
  );

  return (
    <Container ref={ref} space="medium">
      <VerticalSpace space="extraSmall" />
      <Stack space="medium">
        <Content />
        <Footer />
      </Stack>
      <VerticalSpace space="medium" />
    </Container>
  );
}

export default render(Plugin);
