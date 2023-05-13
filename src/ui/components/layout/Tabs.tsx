import { Children, cloneElement, useEffect, useMemo, useState } from "react";
import { css } from "utils/css";
import cn from "classnames";

css`
  .tabs {
    display: grid;
    align-content: start;
  }

  .tabs > .tab-list {
    padding: 0 var(--size-md);
  }

  .tab {
    display: grid;
    align-items: center;
    height: var(--size-xxl);
    background-color: transparent;
    text-decoration: none;
    border: 0;
    outline: none;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-sm);
    letter-spacing: var(--letter-spacing-sm);
    color: var(--secondary);
    cursor: pointer;
  }

  .tab.is-active {
    color: var(--primary);
  }

  .tab-list {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    gap: var(--size-md);
  }

  .tab-panel {
  }

  .tab-panel:not(.is-active) {
    display: none;
  }
`;

type TabsChildren = React.ReactElement<ComponentAttr>;

export const Tabs: FC<{
  active?: number;
  children: TabsChildren[];
}> = ({ active: activeProp = 0, children: childrenProp }) => {
  const [active, setActive] = useState(activeProp);

  const children = useMemo(() => {

    let tabPanelIndex = -1;

    return Children.map<React.ReactElement, TabsChildren>(
      childrenProp,
      (children) => {
        if (children.type === TabList) {
          return cloneElement(children, {
            ...children.props,
            children: Children.map(
              children.props.children as TabsChildren,
              (tab, tabIndex) => {
                return cloneElement(tab, {
                  className: cn(tabIndex === active && "is-active"),
                  onClick: () => setActive(tabIndex)
                });
              }
            ),
          });
        }

        if (children.type === TabPanel) {
          tabPanelIndex += 1;

          return cloneElement(children, {
            className: cn(tabPanelIndex === active && "is-active"),
          });
        }

        return children;
      }
    );
  }, [active, childrenProp]);

  useEffect(() => {
    setActive(activeProp);
  }, [activeProp]);

  return <div className={cn("tabs")}>{children}</div>;
};

export const Tab: Component = ({ children, className, onClick }) => {
  return (
    <div className={cn("tab", className)} onClick={onClick}>
      {children}
    </div>
  );
};

export const TabList: Component = ({ children, className }) => {
  return <div className={cn("tab-list", className)}>{children}</div>;
};

export const TabPanel: Component = ({ children, className }) => {
  return <div className={cn("tab-panel", className)}>{children}</div>;
};
