import { api } from "ui/api";
import { create } from "zustand";

export const useEditorType = create<{
  editorType: "figma" | "figjam" | "dev";
}>(() => ({
  editorType: "figma",
}));

api.on<Api.GetEditorTypeHandler>("GET_EDITOR_TYPE", (editorType) => {
  useEditorType.setState({
    editorType,
  });
});
