export const updateWindowSize = () => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "onResize",
        height: app.clientHeight + 1,
      },
    },
    "*"
  );
};

export const updateConfig = (config: IConfig) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "onConfig",
        config: config,
      },
    },
    "*"
  );
};

export const getConfig = () => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "getConfig",
      },
    },
    "*"
  );
};

export const getFigmaSelection = () => {
  parent.postMessage({ pluginMessage: { type: "getSelection" } }, "*");
};
