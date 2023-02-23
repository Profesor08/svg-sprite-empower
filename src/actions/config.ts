export const save = async (value: any) => {
  await figma.clientStorage.setAsync(
    "svg-sprite-empower-config",
    JSON.stringify(value)
  );
};

export const load = async () => {
  const data = await figma.clientStorage.getAsync("svg-sprite-empower-config");

  if (typeof data === "string") {
    return JSON.parse(data);
  }

  return undefined;
};
