import { Divider, Typography } from "antd";
import { Grid } from "../grid/Grid";

export const Footer = () => {
  return (
    <Grid space="sm">
      <Divider plain style={{ margin: 0 }} />

      <Typography.Text type="secondary">
        Developed by:{" "}
        <Typography.Link
          href="https://github.com/Profesor08/svg-sprite-empower"
          target="_blank"
        >
          Profesor08
        </Typography.Link>
      </Typography.Text>
    </Grid>
  );
};
