import { load } from "./config";

export const getConfig = async () => {
  const config = await load();

  if (config !== undefined) {
    figma.ui.postMessage({
      type: "getConfig",
      config: config,
    });
  }
};
