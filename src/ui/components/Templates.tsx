import {
  Bold,
  Columns,
  Link,
  MiddleAlign,
  Muted,
  SegmentedControl,
  Stack,
  Text,
  TextboxMultiline,
} from "@create-figma-plugin/ui";
import { useConfig } from "hooks/useConfig";
import { useIcons } from "hooks/useIcons";
import { JSX, h } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import pretty from "pretty";
import { copy } from "utils/copy";

const build = (icons: App.Icon[], template: string) => {
  return icons
    .map((icon) =>
      Object.entries(icon)
        .reduce((template, [key, value]) => {
          return template.replace(
            new RegExp(`{${key}}`, "g"),
            value.toString()
          );
        }, template)
        .trim()
    )
    .join("\n\n");
};

const tabs: {
  value: App.Template.Type;
}[] = [
  {
    value: "html",
  },
  {
    value: "svg",
  },
  {
    value: "react",
  },
  {
    value: "pug",
  },
];

export const Templates = () => {
  const icons = useIcons((state) => state.icons);
  const { templates, selectedTemplate: type } = useConfig(
    (state) => state.config
  );
  const setConfig = useConfig((state) => state.setConfig);

  const output = useMemo(() => {
    switch (type) {
      case "html":
        return pretty(build(icons, templates.html));
      case "svg":
        return pretty(build(icons, templates.svg));
      case "react":
        return build(icons, templates.react);
      case "pug":
        return pretty(build(icons, templates.pug));
    }
  }, [icons, templates, type]);

  const onCopy = useCallback(
    (event: Event) => {
      event.preventDefault();
      copy(output);
    },
    [output]
  );

  const setType = useCallback(
    (type: App.Template.Type) => {
      setConfig({
        selectedTemplate: type,
      });
    },
    [setConfig]
  );

  const onTemplateUpdateHandler: JSX.GenericEventHandler<HTMLTextAreaElement> =
    useCallback(
      (event) => {
        setConfig({
          templates: {
            ...templates,
            [type]: event.currentTarget.value,
          },
        });
      },
      [setConfig, templates, type]
    );

  return (
    <Stack space="medium">
      <Stack space="extraSmall">
        <Columns space="medium">
          <SegmentedControl
            onValueChange={setType}
            options={tabs}
            value={type}
          />
          <MiddleAlign style={{ justifyContent: "end" }}>
            <Text align="right">
              <Link href="#" onClick={onCopy}>
                <Bold>Copy</Bold>
              </Link>
            </Text>
          </MiddleAlign>
        </Columns>

        <TextboxMultiline
          rows={12}
          value={output}
          variant="border"
          readOnly
          style={{
            whiteSpace: "pre",
          }}
        />
      </Stack>

      <Stack space="extraSmall">
        <Text>
          <Muted>Variables: {`{name}, {width}, {height}, {svg}`}</Muted>
        </Text>

        <TextboxMultiline
          rows={4}
          value={templates[type]}
          onChange={onTemplateUpdateHandler}
          variant="border"
          style={{
            whiteSpace: "pre",
          }}
        />
      </Stack>
    </Stack>
  );

  // return (
  //   <>
  //     <Section>
  //       <Header>
  //         <TabList>
  //           {tabs.map((tab, index) => (
  //             <Tab
  //               key={index}
  //               className={cn(type === tab && "is-active")}
  //               onClick={() => setType(tab)}
  //             >
  //               {tab}
  //             </Tab>
  //           ))}
  //         </TabList>
  //         <Button onClick={onCopy}>Copy</Button>
  //       </Header>
  //       <Textarea rows={15} value={output} readOnly></Textarea>
  //     </Section>
  //     <Section>
  //       <Header>
  //         <Label>Variables: {`{name}, {width}, {height}, {svg}`}</Label>
  //       </Header>
  //       <Textarea
  //         rows={5}
  //         value={templates[type]}
  //         onChange={(event) =>
  //           onTemplateUpdateHandler(event.currentTarget.value, type)
  //         }
  //       ></Textarea>
  //     </Section>
  //   </>
  // );
};
