import { useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { updateWindowSize } from "./api/api";
import { ColorMultiple } from "./components/ColorMultiple";
import { ColorOverride } from "./components/ColorOverride";
import { Header } from "./components/Header";
import { Output } from "./components/Output";
import { Select } from "./components/Select";
import { Context, createConfig } from "./hooks/useConfig";
import { useResize } from "./hooks/useResize";

const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  const context = createConfig();

  useResize(
    ref,
    useCallback(() => {
      updateWindowSize();
    }, [])
  );

  return (
    <Context.Provider value={context}>
      <div ref={ref}>
        <main>
          <Output />

          <hr />

          <section>
            <Header title="Color" />

            <Select />

            <ColorOverride />

            <ColorMultiple />
          </section>
        </main>

        <hr />

        <footer>
          <span>
            Developed by:{" "}
            <a href="https://github.com/Profesor08" target="_blank">
              Profesor08
            </a>
          </span>
        </footer>
      </div>
    </Context.Provider>
  );
};

const root = createRoot(app);

root.render(<App />);
