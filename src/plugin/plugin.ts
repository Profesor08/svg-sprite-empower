import { onClose } from "./actions/onClose";
import { save } from "./actions/config";
import { onSelection } from "./actions/onSelection";
import { onResize } from "./actions/onResize";
import { getConfig } from "./actions/getConfig";

const init = async () => {
  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, {
    themeColors: true,
  });

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.

  figma.ui.on("message", async (msg) => {
    switch (msg.type) {
      case "close":
        return onClose();

      case "getSelection":
        return onSelection();

      case "onConfig":
        return save(msg.config);

      case "getConfig":
        return getConfig();

      case "onResize":
        return onResize(300, msg.height);
    }
  });

  figma.on("selectionchange", onSelection);

  onResize(300, 350);
};

init();
