import { ConfigProvider } from "antd";
import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { api } from "./api";
import { useColorMode } from "./hooks/useColorMode";
import { useEditorType } from "./hooks/useEditorType";
import { useResize } from "./hooks/useResize";
import { Container } from "./layout/container/Container";
import { Layout } from "./layout/layout/Layout";
import { routes } from "./router";
import "./style/main.scss";
import { figmaDark, figmaDevDark, figmaDevLight, figmaLight } from "./theme";

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);

  root.render(<Iframe />);
}

export const router = createMemoryRouter(
  [
    {
      element: <Layout />,
      children: routes,
    },
  ],
  {
    basename: "/",
  },
);

function Iframe() {
  const editorType = useEditorType((state) => state.editorType);

  const colorMode = useColorMode();

  const theme = useMemo(() => {
    if (editorType === "figma" || editorType === "figjam") {
      return colorMode === "light" ? figmaLight : figmaDark;
    }

    return colorMode === "light" ? figmaDevLight : figmaDevDark;
  }, [colorMode, editorType]);

  useResize((width: number, height: number) => {
    console.log(height, document.body.clientHeight);

    api.emit<Api.ResizeHandler>("RESIZE", 300, height);
  });

  return (
    <ConfigProvider theme={theme}>
      <Container x="xxs" y="md">
        <RouterProvider router={router} />
      </Container>
    </ConfigProvider>
  );
}
