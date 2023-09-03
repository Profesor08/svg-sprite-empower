import { Bold, Code, Disclosure, Stack, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useCallback } from "preact/hooks";
import { create } from "zustand";
import { Grid } from "./Grid";
import { Html } from "./Html";

const useSection = create<{
  section: string | null;
  toggleSection(section: string | null): void;
}>((set) => ({
  section: null,
  toggleSection(section) {
    set((state) => ({
      section: state.section === section ? null : section,
    }));
  },
}));

export const Help = () => {
  return (
    <Grid>
      <QuickStartHelp />
      <WarningHelp />
      <SvgAttributesHelp />
      <SymbolAttributesHelp />
      <ColorsHelp />
      <AttributesHelp />
      <TemplatesHelp />
    </Grid>
  );
};

const Section: Component<{
  title: string;
}> = ({ title, children }) => {
  const section = useSection((state) => state.section);
  const toggleSection = useSection((state) => state.toggleSection);

  const onOpen = useCallback(() => {
    toggleSection(title);
  }, [title, toggleSection]);

  return (
    <Disclosure onClick={onOpen} open={section === title} title={title}>
      {children}
    </Disclosure>
  );
};

const svg = `
<svg width="24" height="24" viewBox="0 0 24 24">
  <use href="icons.svg?#icon"></use>
</svg>
`;

const svgSymbol = `
<symbol id="icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="..." stroke="black" />
</symbol>
`;

const QuickStartHelp = () => {
  return (
    <Section title="Quick start">
      <Stack space="small">
        <Text>
          <Bold>1.</Bold> Set svg <Bold>width</Bold> and <Bold>height</Bold>{" "}
          attributes same as icon size
        </Text>
        <Text>
          <Bold>2.</Bold> Add <Bold>viewBox</Bold> attribute to svg with same
          values as icon size
        </Text>
        <Text>
          <Bold>3.</Bold> Add <Bold>id</Bold> attribute to symbol
        </Text>
        <Text>
          <Bold>4.</Bold> Add <Bold>viewBox</Bold> attribute to symbol with same
          values as icon size
        </Text>
        <Text>
          <Bold>5.</Bold> Add <Bold>fill="none"</Bold> attribute to symbol
        </Text>
      </Stack>
    </Section>
  );
};

const WarningHelp = () => {
  return (
    <Section title="Warning">
      <Stack space="small">
        <Text>
          <Bold>Gradients, masks, clips paths and etc. with "id"</Bold> are not
          working in svg symbols. To use them, you have to define them in some
          another place and target them with <Bold>url()</Bold>
        </Text>
        <Text>
          If you see some related code to this in generated symbol,{" "}
          <Bold>feel free to delete it</Bold>. But better avoid using this
          things for icon sprites.
        </Text>
        <Text>
          If you need all this complex things, just create an separate svg file.
        </Text>
      </Stack>
    </Section>
  );
};

const SvgAttributesHelp = () => {
  return (
    <Section title="Svg">
      <Stack space="small">
        <Text>
          <Code>
            <Html code={svg} />
          </Code>
        </Text>
        <Text>
          <Bold>width</Bold> and <Bold>height</Bold> attributes will determine
          the size of svg. It is important to indicate them to avoid layout
          shift while .svg and styles are loading. They are required is you want
          to avoid unexpected behavior when you do something programmatically
          (clicks, animation, size calculation, intersections).
        </Text>
        <Text>
          <Bold>viewBox</Bold> is optionaly required, but it is better to
          include it, to avoid different bugs with calculation of svg dimentions
          when you do some things programmatically.
        </Text>
        <Text>
          <Bold>If you want to avoid any problems, just include them all</Bold>
        </Text>
      </Stack>
    </Section>
  );
};

const SymbolAttributesHelp = () => {
  return (
    <Section title="Symbol">
      <Stack space="small">
        <Text>
          <Code>
            <Html code={svgSymbol} />
          </Code>
        </Text>
        <Text>
          <Bold>id</Bold> is required to display symbol in{" "}
          <Html code={`<use />`} /> element
        </Text>
        <Text>
          <Bold>width</Bold> and <Bold>height</Bold> will restrict symbol size
          and will prevent icon from scaling with <Bold>width</Bold> and{" "}
          <Bold>height</Bold> attributes on <Html code={`<svg />`} /> element.
          Do not use them if you don't need them.
        </Text>
        <Text>
          <Bold>viewBox</Bold> is required to have posibility to scale icon with{" "}
          <Bold>width</Bold> and <Bold>height</Bold> attributes on{" "}
          <Html code={`<svg />`} /> element.
        </Text>
        <Text>
          <Bold>fill="none"</Bold> will clear all unexpeced default{" "}
          <Bold>fill</Bold> styles coming from enywhere
        </Text>
      </Stack>
    </Section>
  );
};

const ColorsHelp = () => {
  return (
    <Section title="Colors">
      <Stack space="small">
        <Text>
          <Bold>currentColor</Bold> - will replace all <Bold>fill</Bold> and{" "}
          <Bold>stroke</Bold> attributes value with "currentColor"
        </Text>
        <Text>
          <Bold>override</Bold> - will replace all <Bold>fill</Bold> and{" "}
          <Bold>stroke</Bold> attributes value with value from text field
        </Text>
        <Text>
          <Bold>multiple</Bold> - will replace all <Bold>fill</Bold> and{" "}
          <Bold>stroke</Bold> attributes value with values from text field one
          by one. If <Bold>loop</Bold> is active it will not stop replacing if
          no more color values, but will pick from first.
        </Text>
        <Text>
          <Bold>initial</Bold> - will keep <Bold>fill</Bold> and{" "}
          <Bold>stroke</Bold> attributes values as is.
        </Text>
        <Text>
          <Bold>remove</Bold> - will remove <Bold>fill</Bold> and{" "}
          <Bold>stroke</Bold> attributes.
        </Text>
      </Stack>
    </Section>
  );
};

const AttributesHelp = () => {
  return (
    <Section title="Attributes">
      <Stack space="small">
        <Text>
          Include or not selected attributes in generated{" "}
          <Html code={`<symbol />`} />
        </Text>
      </Stack>
    </Section>
  );
};

const TemplatesHelp = () => {
  return (
    <Section title="Templates">
      <Stack space="small">
        <Text>
          There you can define you custom templates to easy use in your code. Or
          keep using defined by default.
        </Text>
        <Text>
          Currently there are a few defined templates for{" "}
          <Bold>html, svg, react and pug</Bold>. But any template it is only
          string, you can write any code in any tab.
        </Text>
        <Text>
          Templates support a few pre defined variables{" "}
          <Code>{`{name}, {width}, {height}, {svg}`}</Code>, use them in any
          playce you want.
        </Text>
      </Stack>
    </Section>
  );
};
