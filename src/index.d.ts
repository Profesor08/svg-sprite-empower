declare namespace Api {
  interface EventHandler {
    name: string;
    listener: (...args: any) => void;
  }

  type Message<Handler extends EventHandler = EventHandler> = [
    Handler["name"],
    ...Parameters<Handler["listener"]>,
  ];

  interface CloseHandler extends EventHandler {
    name: "CLOSE";
    listener: () => void;
  }

  interface ResizeHandler extends EventHandler {
    name: "RESIZE";
    listener: (width: number, height: number) => void;
  }

  interface GetConfigHandler extends EventHandler {
    name: "GET_CONFIG";
    listener: (config: App.Config) => void;
  }

  interface SetConfigHandler extends EventHandler {
    name: "SET_CONFIG";
    listener: (config: App.Config) => void;
  }

  interface SelectionHandler extends EventHandler {
    name: "SELECTION";
    listener: (entries: App.Selection[]) => void;
  }

  interface GetEditorTypeHandler extends EventHandler {
    name: "GET_EDITOR_TYPE";
    listener: (editorType: "figma" | "figjam" | "dev") => void;
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
    sizeLimit: number;
  }

  namespace Color {
    type Type = "currentColor" | "initial" | "remove" | "override" | "multiple";
  }

  namespace Template {
    type Type = "html" | "svg" | "react" | "pug";
  }

  interface Selection {
    id: string;
    name: string;
    width: number;
    height: number;
    bytes: Uint8Array;
  }

  interface Icon {
    id: string;
    name: string;
    width: number;
    height: number;
    size: number;
    svg: string;
  }
}
