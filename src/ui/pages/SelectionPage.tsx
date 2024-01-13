import { Typography } from "antd";
import { ColorMode } from "ui/components/config/ColorMode";
import { ColorMultiple } from "ui/components/config/ColorMultiple";
import { ColorOverride } from "ui/components/config/ColorOverride";
import { Config } from "ui/components/config/Config";
import { Output } from "ui/components/output/Output";
import { useConfig } from "ui/hooks/useConfig";
import { Grid } from "ui/layout/grid/Grid";

export const SelectionPage = () => {
  return (
    <Grid space="sm">
      <Output />
      <ConfigOptions />
    </Grid>
  );
};

const ConfigOptions = () => {
  const config = useConfig((state) => state.config);

  return (
    <Grid space="sm">
      <Typography.Text strong>Color</Typography.Text>

      <ColorMode />

      {config.color === "override" && <ColorOverride />}

      {config.color === "multiple" && <ColorMultiple />}

      <Config />
    </Grid>
  );
};
