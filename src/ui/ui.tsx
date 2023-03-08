import { useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { updateWindowSize } from "api/api";
import { ColorMultiple } from "components/ColorMultiple";
import { ColorOverride } from "components/ColorOverride";
import { Header } from "components/layout/Header";
import { Output } from "components/Output";
import { Section } from "components/layout/Section";
import { Select } from "components/form/Select";
import { Context, createConfig } from "hooks/useConfig";
import { useResize } from "hooks/useResize";
import { Footer } from "components/layout/Footer";
import { Line } from "components/layout/Line";
import "./styles";

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

          <Line />

          <Section>
            <Header title="Color" />

            <Select />

            <ColorOverride />

            <ColorMultiple />
          </Section>
        </main>

        <Line />

        <Footer />
      </div>
    </Context.Provider>
  );
};

const root = createRoot(app);

root.render(<App />);
