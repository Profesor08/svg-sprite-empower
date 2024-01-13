import { Typography } from "antd";

export const AboutPage = () => {
  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Svg Sprite Empower
      </Typography.Title>

      <Typography.Paragraph>
        This Figma plugin makes it easy to create svg sprites based on
        selection. Or to pick icons one by one and to use them in yout code.
      </Typography.Paragraph>

      <Typography.Title level={5}>Features</Typography.Title>

      <Typography.Paragraph>
        <ul>
          <li>Automatic sprite generation based on selection</li>
          <li>Availability to change colors</li>
          <li>
            Apply different colors or <b>css variables</b>
          </li>
          <li>Create custom templates for your icons</li>
          <li>Complete guide</li>
        </ul>
      </Typography.Paragraph>

      <Typography.Title level={5}>Source Code</Typography.Title>

      <Typography.Paragraph>
        The source code for this plugin is available on GitHub:
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ul>
          <li>
            <Typography.Link
              href="https://github.com/Profesor08/svg-sprite-empower"
              target="_blank"
            >
              Svg Sprite Empower on GitHub
            </Typography.Link>
          </li>
        </ul>
      </Typography.Paragraph>

      <Typography.Title level={5}>Issues</Typography.Title>

      <Typography.Paragraph>
        If you encounter any issues while using this plugin, please report them
        on our GitHub issues page:
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ul>
          <li>
            <Typography.Link
              href="https://github.com/Profesor08/svg-sprite-empower/issues"
              target="_blank"
            >
              Svg Sprite Empower Issues
            </Typography.Link>
          </li>
        </ul>
      </Typography.Paragraph>

      <Typography.Paragraph>
        Please provide as much detail as possible in your issue report,
        including steps to reproduce the issue, any error messages you received,
        and screenshots if applicable.
      </Typography.Paragraph>

      <Typography.Title level={5}>Contributing</Typography.Title>

      <Typography.Paragraph>
        If you'd like to contribute, please see{" "}
        <Typography.Link
          href="https://github.com/Profesor08/svg-sprite-empower"
          target="_blank"
        >
          Svg Sprite Empower GitHub
        </Typography.Link>
      </Typography.Paragraph>
    </div>
  );
};
