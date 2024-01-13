import { PluginApi } from "api/PluginApi";
import { getConfig, setConfig } from "./figma/config";
import { selection } from "./figma/selection";

figma.showUI(__html__, { themeColors: true, width: 300, height: 350 });

const api = new PluginApi();

api.once<Api.CloseHandler>("CLOSE", () => {
  figma.closePlugin();
});

api.on<Api.ResizeHandler>("RESIZE", (width, height) => {
  figma.ui.resize(width, height);
});

api.on<Api.SetConfigHandler>("SET_CONFIG", (config) => {
  setConfig(config);
  updateSelection();
});

api.emit<Api.GetEditorTypeHandler>("GET_EDITOR_TYPE", figma.editorType);

selection.on(updateSelection);

provideConfig();
updateSelection();

async function updateSelection() {
  const entries = await selection.get();

  api.emit<Api.SelectionHandler>("SELECTION", entries);
}

async function provideConfig() {
  const config = await getConfig();

  if (config !== undefined) {
    api.emit<Api.GetConfigHandler>("GET_CONFIG", config);
  }
}
