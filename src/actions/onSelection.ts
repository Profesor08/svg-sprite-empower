import debounce from "lodash/debounce";

export const onSelection = debounce(
  async () => {
    const entries = await Promise.all(
      figma.currentPage.selection.map(async (node) => {
        const bytes = await node.exportAsync({
          format: "SVG",
          contentsOnly: true,
          suffix: "",
          svgIdAttribute: false,
          svgOutlineText: true,
          svgSimplifyStroke: true,
        });

        const svg = bytes.reduce(
          (str, byte) => str + String.fromCharCode(byte),
          ""
        );

        return {
          id: node.id,
          name: node.name,
          width: node.width,
          height: node.height,
          svg,
        };
      })
    );

    figma.ui.postMessage({
      type: "selectionChange",
      entries,
    });
  },
  500,
  {
    trailing: true,
    leading: true,
    maxWait: 500,
  }
);
