import { Input, Segmented, Typography } from "antd";
import { SegmentedLabeledOption, SegmentedValue } from "antd/es/segmented";
import pretty from "pretty";
import { useCallback, useMemo } from "react";
import { useConfig } from "ui/hooks/useConfig";
import { useIcons } from "ui/hooks/useIcons";
import { Grid } from "ui/layout/grid/Grid";
import { copy } from "ui/utils/copy";

export const TemplatesPage = () => {
  const icons = useIcons((state) => state.icons);
  const { templates, selectedTemplate: type } = useConfig(
    (state) => state.config,
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

  const onTemplateUpdateHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (event) => {
        setConfig({
          templates: {
            ...templates,
            [type]: event.currentTarget.value,
          },
        });
      },
      [setConfig, templates, type],
    );

  const onCopy: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();
      copy(output);
    },
    [output],
  );

  const setType = useCallback(
    (type: SegmentedValue) => {
      setConfig({
        selectedTemplate: type as App.Template.Type,
      });
    },
    [setConfig],
  );

  const options: SegmentedLabeledOption[] = [
    {
      label: "html",
      value: "html",
    },
    {
      label: "svg",
      value: "svg",
    },
    {
      label: "react",
      value: "react",
    },
    {
      label: "pug",
      value: "pug",
    },
  ];

  return (
    <Grid space="md">
      <Grid space="xs">
        <Grid columns="1fr auto" space="md">
          <Segmented
            value={type}
            options={options}
            onChange={setType}
            size="small"
          />

          <Typography.Text strong>
            <Typography.Link onClick={onCopy}>Copy</Typography.Link>
          </Typography.Text>
        </Grid>

        <Input.TextArea
          value={output}
          rows={12}
          bordered
          readOnly
          style={{
            whiteSpace: "pre",
            resize: "none",
          }}
        />
      </Grid>

      <Grid space="xs">
        <Typography.Text type="secondary">
          Variables: {`{name}, {width}, {height}, {svg}`}
        </Typography.Text>

        <Input.TextArea
          value={templates[type]}
          onChange={onTemplateUpdateHandler}
          rows={4}
          bordered
          style={{
            whiteSpace: "pre",
            resize: "none",
          }}
        />
      </Grid>
    </Grid>
  );
};

const build = (icons: App.Icon[], template: string) => {
  return icons
    .map((icon) =>
      Object.entries(icon)
        .reduce((template, [key, value]) => {
          return template.replace(
            new RegExp(`{${key}}`, "g"),
            value.toString(),
          );
        }, template)
        .trim(),
    )
    .join("\n\n");
};
