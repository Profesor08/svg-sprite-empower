import { Input, Typography } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { useCallback } from "react";
import { useIcons } from "ui/hooks/useIcons";
import { Grid } from "ui/layout/grid/Grid";
import { copy } from "ui/utils/copy";

export const Output = () => {
  const { markup, size } = useIcons();

  const onCopy = useCallback(
    (event: React.SyntheticEvent) => {
      copy(markup);
      event.preventDefault();
    },
    [markup],
  );

  return (
    <Grid space="xs">
      <Grid columns="1fr auto auto" space="md" y="xxs" align="baseline">
        <Typography.Text strong>Selection</Typography.Text>

        <Typography.Text type={sizeType(size)}>
          <small>size: {byteValueNumberFormatter.format(size)}</small>
        </Typography.Text>

        <Typography.Link strong onClick={onCopy}>
          Copy
        </Typography.Link>
      </Grid>

      <Input.TextArea
        value={markup}
        rows={10}
        bordered
        readOnly
        style={{
          whiteSpace: "pre",
          resize: "none",
        }}
      />
    </Grid>
  );
};

const byteValueNumberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

const sizeType = (size: number): BaseType => {
  const sizeInMb = size / 1024 / 1024;

  switch (true) {
    case sizeInMb === 0:
      return "secondary";
    case sizeInMb < 0.24:
      return "success";
    case sizeInMb < 0.5:
      return "warning";
    default:
      return "danger";
  }
};
