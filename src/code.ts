import { onClose } from "./actions/onClose";
import { save, load } from "./actions/config";
import { onPretty } from "./actions/onPretty";
import { onSelection } from "./actions/onSelection";
import { onResize } from "./actions/onResize";

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
        onClose();
        break;
      case "getSelection":
        onSelection();
        break;
      case "onPretty":
        onPretty(msg.markup);
        break;
      case "onConfig":
        save(msg.config);
        break;
      case "onResize":
        onResize(300, msg.height);
        break;
    }
  });

  figma.on("selectionchange", onSelection);

  const config = await load();

  if (config !== undefined) {
    figma.ui.postMessage({
      type: "onConfig",
      config: config,
    });
  }

  onResize(300, 350);
};

init();
