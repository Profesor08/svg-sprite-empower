interface Window {
  ["create-figma-plugin"]: HTMLElement;
}

type FC<P = {}> = import("preact").FunctionComponent<P>;

type Component<P = {}> = FC<
  {
    children?: import("preact").ComponentChildren;
  } & P
>;

declare namespace Api {
  type EventHandler = import("@create-figma-plugin/utilities").EventHandler;

  interface CloseHandler extends EventHandler {
    name: "CLOSE";
    handler: () => void;
  }

  interface ResizeHandler extends EventHandler {
    name: "RESIZE";
    handler: (width: number, height: number) => void;
  }

  interface GetConfigHandler extends EventHandler {
    name: "GET_CONFIG";
    handler: (config: App.Config) => void;
  }

  interface SetConfigHandler extends EventHandler {
    name: "SET_CONFIG";
    handler: (config: App.Config) => void;
  }

  interface SelectionHandler extends EventHandler {
    name: "SELECTION";
    handler: (entries: App.Icon[]) => void;
  }
}

declare namespace App {
  interface Config {
    color: Color.Type;
    colorOverride: string;
    colorMultiple: string;
    colorMultipleLoop: boolean;
    selectedTemplate: Template.Type;
    templates: {
      [key in Template.Type]: string;
    };
    attributes: {
      id: boolean;
      height: boolean;
      width: boolean;
      viewBox: boolean;
      fill: boolean;
    };
  }

  namespace Color {
    type Type = "currentColor" | "initial" | "remove" | "override" | "multiple";
  }

  namespace Template {
    type Type = "html" | "svg" | "react" | "pug";
  }

  interface Icon {
    id: string;
    name: string;
    width: number;
    height: number;
    svg: string;
  }
}
