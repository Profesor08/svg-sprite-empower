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
import { Tabs, TabList, Tab, TabPanel } from "components/layout/Tabs";
import { Templates } from "components/Templates";
import { Title } from "components/layout/Title";

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
          <Tabs>
            <TabList>
              <Tab>Selection</Tab>
              <Tab>Templates</Tab>
            </TabList>

            <TabPanel>
              <Output />

              <Line />

              <Section>
                <Header>
                  <Title>Color</Title>
                </Header>

                <Select />

                <ColorOverride />

                <ColorMultiple />
              </Section>
            </TabPanel>

            <TabPanel>
              <Templates />
            </TabPanel>
          </Tabs>
        </main>

        <Line />

        <Footer />
      </div>
    </Context.Provider>
  );
};

const root = createRoot(app);

root.render(<App />);
