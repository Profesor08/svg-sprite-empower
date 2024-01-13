import { ApiBase } from "./ApiBase";

export class UIApi extends ApiBase {
  constructor() {
    super();

    window.addEventListener("message", (event: FigmaMessageEvent) => {
      const [name, ...args] = event.data.pluginMessage;

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

    parent.postMessage({ pluginMessage: message }, "*");
  };
}
