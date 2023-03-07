type FC<P = unknown> = React.FC<React.PropsWithChildren<P>>;

interface IContext extends IConfig {
  update: (config: Partial<IConfig>) => void;
}

type IColorType =
  | "currentColor"
  | "initial"
  | "remove"
  | "override"
  | "multiple";

interface IConfig {
  color: IColorType;
  colorOverride: string;
  colorMultiple: string;
  colorMultipleLoop: boolean;
}

type IFigmaPluginMessage =
  | {
      type: "selectionChange";
      entries: Icon[];
    }
  | {
      type: "onPretty";
      markup: string;
    }
  | {
      type: "getConfig";
      config: IConfig;
    };

interface IFigmaMessageData {
  pluginMessage: IFigmaPluginMessage;
}

interface IFigmaMessageEvent extends MessageEvent<IFigmaMessageData> {}

interface WindowEventMap {
  message: IFigmaMessageEvent;
}

interface CustomUIAPI extends Omit<UIAPI, "postMessage"> {
  postMessage(
    pluginMessage: IFigmaPluginMessage,
    options?: UIPostMessageOptions
  ): void;
}

interface CustomPluginAPI extends Omit<PluginAPI, "ui"> {
  ui: CustomUIAPI;
}

// @ts-ignore
declare const figma: CustomPluginAPI;

declare const app: HTMLDivElement;

interface Icon {
  id: string;
  name: string;
  width: number;
  height: number;
  svg: string;
}
