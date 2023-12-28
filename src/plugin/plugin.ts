import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import debounce from "lodash/debounce";

export default async function () {
  showUI({
    width: 300,
    height: 350,
  });

  once<Api.CloseHandler>("CLOSE", () => {
    figma.closePlugin();
  });

  on<Api.ResizeHandler>("RESIZE", (width, height) => {
    figma.ui.resize(width, height);
  });

  on<Api.SetConfigHandler>("SET_CONFIG", (config) => {
    setClientConfig(config);
  });

  figma.on(
    "selectionchange",
    debounce(provideCurrentSelection, 500, {
      trailing: true,
      leading: true,
      maxWait: 500,
    }),
  );

  provideConfig();
  provideCurrentSelection();
}

const provideConfig = async () => {
  const config = await getClientConfig();

  if (config !== undefined) {
    emit<Api.GetConfigHandler>("GET_CONFIG", config);
  }
};

const provideCurrentSelection = async () => {
  const entries = await getSelection();

  emit<Api.SelectionHandler>("SELECTION", entries);
};

const getClientConfig = async (): Promise<App.Config | undefined> => {
  const data = await figma.clientStorage.getAsync("svg-sprite-empower-config");

  if (typeof data === "string") {
    return JSON.parse(data);
  }

  return undefined;
};

const setClientConfig = async (config: App.Config) => {
  await figma.clientStorage.setAsync(
    "svg-sprite-empower-config",
    JSON.stringify(config),
  );

  provideCurrentSelection();
};

const getSelection = async (): Promise<App.Selection[]> => {
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
};
