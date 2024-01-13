import { ApiBase } from "./ApiBase";

export class PluginApi extends ApiBase {
  constructor() {
    super();

    figma.ui.on("message", ([name, ...args]: Api.Message) => {
      for (const handler of this.events) {
        if (handler.name === name) {
          handler.listener(...args);
        }
      }
    });
  }

  public readonly emit = <Handler extends Api.EventHandler>(
    name: Handler["name"],
    ...args: Parameters<Handler["listener"]>
  ) => {
    const message: Api.Message = [name, ...args];

    figma.ui.postMessage(message);
  };
}
