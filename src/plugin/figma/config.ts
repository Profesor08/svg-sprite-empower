export const getConfig = async (): Promise<App.Config | undefined> => {
  const data = await figma.clientStorage.getAsync("svg-sprite-empower-config");

  if (typeof data === "string") {
    return JSON.parse(data);
  }

  return undefined;
};

export const setConfig = async (config: App.Config) => {
  await figma.clientStorage.setAsync(
    "svg-sprite-empower-config",
    JSON.stringify(config),
  );
};
