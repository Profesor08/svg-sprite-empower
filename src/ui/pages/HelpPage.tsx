import { Collapse, CollapseProps, Typography } from "antd";
import { Code } from "ui/components/code/Code";
import { Grid } from "ui/layout/grid/Grid";

export const HelpPage = () => {
  const items: CollapseProps["items"] = [
    {
      key: 1,
      label: <Typography.Text strong>Quick start</Typography.Text>,
      children: <QuickStartHelp />,
    },
    {
      key: 2,
      label: <Typography.Text strong>Warning</Typography.Text>,
      children: <WarningHelp />,
    },
    {
      key: 3,
      label: <Typography.Text strong>Images</Typography.Text>,
      children: <ImagesHelp />,
    },
    {
      key: 4,
      label: <Typography.Text strong>Svg</Typography.Text>,
      children: <SvgAttributesHelp />,
    },
    {
      key: 5,
      label: <Typography.Text strong>Symbol</Typography.Text>,
      children: <SymbolAttributesHelp />,
    },
    {
      key: 6,
      label: <Typography.Text strong>Colors</Typography.Text>,
      children: <ColorsHelp />,
    },
    {
      key: 7,
      label: <Typography.Text strong>Attributes</Typography.Text>,
      children: <AttributesHelp />,
    },
    {
      key: 8,
      label: <Typography.Text strong>Templates</Typography.Text>,
      children: <TemplatesHelp />,
    },
  ];

  return (
    <Grid>
      <Collapse items={items} ghost />
    </Grid>
  );
};

const QuickStartHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        <Typography.Text strong>1.</Typography.Text> Set svg{" "}
        <Typography.Text strong>width</Typography.Text> and{" "}
        <Typography.Text strong>height</Typography.Text> attributes same as icon
        size
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>2.</Typography.Text> Add{" "}
        <Typography.Text strong>viewBox</Typography.Text> attribute to svg with
        same values as icon size
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>3.</Typography.Text> Add{" "}
        <Typography.Text strong>id</Typography.Text> attribute to symbol
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>4.</Typography.Text> Add{" "}
        <Typography.Text strong>viewBox</Typography.Text> attribute to symbol
        with same values as icon size
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>5.</Typography.Text> Add{" "}
        <Typography.Text strong>fill="none"</Typography.Text> attribute to
        symbol
      </Typography.Text>
    </Grid>
  );
};

const WarningHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        <Typography.Text strong>
          Gradients, masks, clips paths and etc. with "id"
        </Typography.Text>{" "}
        are not working in svg symbols. To use them, you have to define them in
        some another place and target them with{" "}
        <Typography.Text strong>url()</Typography.Text>
      </Typography.Text>
      <Typography.Text>
        If you see some related code to this in generated symbol,{" "}
        <Typography.Text strong>feel free to delete it</Typography.Text>. But
        better avoid using this things for icon sprites.
      </Typography.Text>
      <Typography.Text>
        If you need all this complex things, just create an separate svg file.
      </Typography.Text>
    </Grid>
  );
};

const ImagesHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        <Typography.Text strong>Raster images</Typography.Text> makes huge
        impact on performance, because they are converted into{" "}
        <Typography.Text strong>base64</Typography.Text> strings. Plugin can
        freeze for long time while trying to display the result into{" "}
        <Code type="html" code={"<textarea />"} />.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>Render Error</Typography.Text> mean that you
        have run in size limit. But you have posibility just to{" "}
        <Typography.Text strong>copy</Typography.Text> generated markup, if you
        need it.
      </Typography.Text>
      <Typography.Text>
        Some times, you can make an unexpected click. So, for protection reason,
        an config was added, where you can set desired size limit.
      </Typography.Text>
    </Grid>
  );
};

const svg = `
<svg width="24" height="24" viewBox="0 0 24 24">
  <use href="icons.svg?#icon"></use>
</svg>
`;

const SvgAttributesHelp = () => {
  return (
    <Grid space="xxs">
      <Code type="html" code={svg} block />
      <Typography.Text>
        <Typography.Text strong>width</Typography.Text> and{" "}
        <Typography.Text strong>height</Typography.Text> attributes will
        determine the size of svg. It is important to indicate them to avoid
        layout shift while .svg and styles are loading. They are required is you
        want to avoid unexpected behavior when you do something programmatically
        (clicks, animation, size calculation, intersections).
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>viewBox</Typography.Text> is optionaly required,
        but it is better to include it, to avoid different bugs with calculation
        of svg dimentions when you do some things programmatically.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>
          If you want to avoid any problems, just include them all
        </Typography.Text>
      </Typography.Text>
    </Grid>
  );
};

const svgSymbol = `
<symbol id="icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="..." stroke="black" />
</symbol>
`;

const SymbolAttributesHelp = () => {
  return (
    <Grid space="xxs">
      <Code type="html" code={svgSymbol} block />
      <Typography.Text>
        <Typography.Text strong>id</Typography.Text> is required to display
        symbol in <Code type="html" code={`<use />`} /> element
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>width</Typography.Text> and{" "}
        <Typography.Text strong>height</Typography.Text> will restrict symbol
        size and will prevent icon from scaling with{" "}
        <Typography.Text strong>width</Typography.Text> and{" "}
        <Typography.Text strong>height</Typography.Text> attributes on{" "}
        <Code type="html" code={`<svg />`} /> element. Do not use them if you
        don't need them.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>viewBox</Typography.Text> is required to have
        posibility to scale icon with{" "}
        <Typography.Text strong>width</Typography.Text> and{" "}
        <Typography.Text strong>height</Typography.Text> attributes on{" "}
        <Code type="html" code={`<svg />`} /> element.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>fill="none"</Typography.Text> will clear all
        unexpeced default <Typography.Text strong>fill</Typography.Text> styles
        coming from enywhere
      </Typography.Text>
    </Grid>
  );
};

const ColorsHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        <Typography.Text strong>currentColor</Typography.Text> - will replace
        all <Typography.Text strong>fill</Typography.Text> and{" "}
        <Typography.Text strong>stroke</Typography.Text> attributes value with
        "currentColor"
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>override</Typography.Text> - will replace all{" "}
        <Typography.Text strong>fill</Typography.Text> and{" "}
        <Typography.Text strong>stroke</Typography.Text> attributes value with
        value from text field
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>multiple</Typography.Text> - will replace all{" "}
        <Typography.Text strong>fill</Typography.Text> and{" "}
        <Typography.Text strong>stroke</Typography.Text> attributes value with
        values from text field one by one. If{" "}
        <Typography.Text strong>loop</Typography.Text> is active it will not
        stop replacing if no more color values, but will pick from first.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>initial</Typography.Text> - will keep{" "}
        <Typography.Text strong>fill</Typography.Text> and{" "}
        <Typography.Text strong>stroke</Typography.Text> attributes values as
        is.
      </Typography.Text>
      <Typography.Text>
        <Typography.Text strong>remove</Typography.Text> - will remove{" "}
        <Typography.Text strong>fill</Typography.Text> and{" "}
        <Typography.Text strong>stroke</Typography.Text> attributes.
      </Typography.Text>
    </Grid>
  );
};

const AttributesHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        Include or not selected attributes in generated{" "}
        <Code type="html" code={`<symbol />`} />
      </Typography.Text>
    </Grid>
  );
};

const TemplatesHelp = () => {
  return (
    <Grid space="xxs">
      <Typography.Text>
        There you can define you custom templates to easy use in your code. Or
        keep using defined by default.
      </Typography.Text>
      <Typography.Text>
        Currently there are a few defined templates for{" "}
        <Typography.Text>html, svg, react and pug</Typography.Text>. But any
        template it is only string, you can write any code in any tab.
      </Typography.Text>
      <Typography.Text>
        Templates support a few pre defined variables{" "}
        <Code code={`{name}, {width}, {height}, {svg}`} />, use them in any
        playce you want.
      </Typography.Text>
    </Grid>
  );
};
