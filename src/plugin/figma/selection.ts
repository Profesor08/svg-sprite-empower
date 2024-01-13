import debounce from "lodash/debounce";

export const selection = {
  get: async (): Promise<App.Selection[]> => {
    const selection = await Promise.all(
      figma.currentPage.selection.map(async (node) => {
        const bytes = await node.exportAsync({
          format: "SVG",
          contentsOnly: true,
          suffix: "",
          svgIdAttribute: false,
          svgOutlineText: true,
          svgSimplifyStroke: true,
        });

        return {
          id: node.id,
          name: node.name,
          width: node.width,
          height: node.height,
          bytes,
        };
      }),
    );

    return selection;
  },

  on: (callback: () => void) => {
    figma.on(
      "selectionchange",
      debounce(callback, 500, {
        trailing: true,
        leading: true,
        maxWait: 500,
      }),
    );
  },
};
