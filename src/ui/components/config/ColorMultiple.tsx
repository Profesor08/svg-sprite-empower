import { Input, Switch, Typography } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";
import { useCallback } from "react";
import { useConfig } from "ui/hooks/useConfig";
import { Grid } from "ui/layout/grid/Grid";
import { Label } from "../forms/label/Label";

export const ColorMultiple = () => {
  const config = useConfig((state) => state.config);
  const setConfig = useConfig((state) => state.setConfig);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setConfig({
        colorMultiple: event.currentTarget.value,
      });
    },
    [setConfig],
  );

  const onLoopChange: SwitchChangeEventHandler = useCallback(
    (colorMultipleLoop) => {
      setConfig({
        colorMultipleLoop,
      });
    },
    [setConfig],
  );

  return (
    <Grid space="sm">
      <Label space="sm">
        <Switch
          value={config.colorMultipleLoop}
          onChange={onLoopChange}
          size="small"
        />
        <Typography.Text>Loop colors</Typography.Text>
      </Label>

      <Grid space="xs">
        <Input.TextArea
          value={config.colorMultiple}
          onChange={onChange}
          rows={5}
          bordered
          style={{
            whiteSpace: "pre",
            resize: "none",
          }}
        />

        <Typography.Text>
          Example:{" "}
          <Typography.Text type="secondary">
            {
              "red, #00ff00, rgba(10, 100, 200, 0.8), var(--bg-color), var(--color-${n})"
            }
          </Typography.Text>
        </Typography.Text>
      </Grid>
    </Grid>
  );
};
