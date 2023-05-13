import { useCallback, useMemo, useState } from "react";
import { Textarea } from "./form/Textarea";
import { Tab, TabList } from "./layout/Tabs";
import { useIcons } from "hooks/useIcons";
import cn from "classnames";
import pretty from "pretty";
import { Header } from "./layout/Header";
import { Section } from "./layout/Section";
import { copy } from "utils/copy";
import { Button } from "./layout/Button";
import { useConfig } from "hooks/useConfig";
import { Label } from "./layout/Label";

const build = (icons: Icon[], template: string) => {
  return icons
    .map((icon) =>
      Object.entries(icon)
        .reduce((template, [key, value]) => {
          return template.replaceAll(`{${key}}`, value.toString());
        }, template)
        .trim()
    )
    .join("\n\n");
};

const tabs: TemplateType[] = ["html", "svg", "react", "pug"];

export const Templates = () => {
  const icons = useIcons();
  const { templates, selectedTemplate: type, update } = useConfig();

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

  const onCopy = useCallback(() => {
    copy(output);
  }, [output]);

  const setType = useCallback(
    (type: TemplateType) => {
      update({
        selectedTemplate: type,
      });
    },
    [update]
  );

  const onTemplateUpdateHandler = useCallback(
    (template: string, type: TemplateType) => {
      update({
        templates: {
          ...templates,
          [type]: template,
        },
      });
    },
    [update, templates]
  );

  return (
    <>
      <Section>
        <Header>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={cn(type === tab && "is-active")}
                onClick={() => setType(tab)}
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <Button onClick={onCopy}>Copy</Button>
        </Header>
        <Textarea rows={15} value={output} readOnly></Textarea>
      </Section>
      <Section>
        <Header>
          <Label>Variables: {`{name}, {width}, {height}, {svg}`}</Label>
        </Header>
        <Textarea
          rows={5}
          value={templates[type]}
          onChange={(event) =>
            onTemplateUpdateHandler(event.currentTarget.value, type)
          }
        ></Textarea>
      </Section>
    </>
  );
};
