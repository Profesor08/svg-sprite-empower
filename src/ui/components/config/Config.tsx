import { Checkbox, Collapse, CollapseProps, Slider, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useCallback } from "react";
import { useConfig } from "ui/hooks/useConfig";
import { Grid } from "ui/layout/grid/Grid";

export const Config = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <Typography.Text strong>Config</Typography.Text>,
      children: (
        <Grid space="sm">
          <SvgMarkup />

          <WhiteSpaceCount />

          <Attributes />

          <SizeLimit />
        </Grid>
      ),
    },
  ];

  return <Collapse items={items} ghost />;
};

const SvgMarkup = () => {
  const includeSvgElement = useConfig(
    (state) => state.config.includeSvgElement,
  );
  const setConfig = useConfig((state) => state.setConfig);

  const onChange = useCallback(
    (event: CheckboxChangeEvent) => {
      setConfig({
        includeSvgElement: event.target.checked,
      });
    },
    [setConfig],
  );

  return (
    <Grid space="sm">
      <Typography.Text strong>SVG markup</Typography.Text>

      <Grid space="md">
        <Checkbox onChange={onChange} checked={includeSvgElement}>
          <Typography.Text>Include SVG element</Typography.Text>
        </Checkbox>
      </Grid>
    </Grid>
  );
};

export const Attributes = () => {
  return (
    <Grid space="sm">
      <Typography.Text strong>Attributes</Typography.Text>

      <Grid space="md">
        <Grid columns="1fr 1fr 1fr">
          <Attribute name="width" />
          <Attribute name="height" />
          <Attribute name="viewBox" />
        </Grid>
        <Grid columns="1fr 1fr 1fr">
          <Attribute name="id" />
          <Attribute name="fill" />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Attribute = ({ name }: { name: keyof App.Config["attributes"] }) => {
  const attribute = useConfig((state) => state.config.attributes[name]);
  const setAttributes = useConfig((state) => state.setAttributes);

  const onChange = useCallback(
    (event: CheckboxChangeEvent) => {
      setAttributes({
        [name]: event.target.checked,
      });
    },
    [name, setAttributes],
  );

  return (
    <Checkbox onChange={onChange} checked={attribute}>
      <Typography.Text>{name}</Typography.Text>
    </Checkbox>
  );
};

const SizeLimit = () => {
  const minimum = 0;
  const maximum = 100;
  const increment = 1;
  const sizeLimit = useConfig((state) => state.config.sizeLimit);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange = useCallback(
    (sizeLimit: number) => {
      setConfig({
        sizeLimit,
      });
    },
    [setConfig],
  );

  return (
    <Grid space="xxs">
      <Typography.Text strong>Size limit:</Typography.Text>

      <Grid>
        <Slider
          value={sizeLimit}
          min={minimum}
          max={maximum}
          step={increment}
          onChange={onChange}
        />

        <Grid columns="auto 1fr auto">
          <Typography.Text type="secondary">{minimum}mb</Typography.Text>
          <Typography.Text style={{ textAlign: "center" }}>
            {sizeLimit}mb
          </Typography.Text>
          <Typography.Text type="secondary">{maximum}mb</Typography.Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

const WhiteSpaceCount = () => {
  const whiteSpaceCount = useConfig((state) => state.config.whiteSpaceCount);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange = useCallback(
    (whiteSpaceCount: number) => {
      setConfig({
        whiteSpaceCount,
      });
    },
    [setConfig],
  );

  return (
    <Grid space="xxs">
      <Typography.Text strong>White space count:</Typography.Text>

      <Grid>
        <Slider
          value={whiteSpaceCount}
          min={0}
          max={50}
          step={1}
          onChange={onChange}
        />

        <Grid columns="auto 1fr auto">
          <Typography.Text type="secondary">0</Typography.Text>
          <Typography.Text style={{ textAlign: "center" }}>
            {whiteSpaceCount}
          </Typography.Text>
          <Typography.Text type="secondary">50</Typography.Text>
        </Grid>
      </Grid>
    </Grid>
  );
};
