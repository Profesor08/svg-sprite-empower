import { useEffect, useState } from "react";

export const useColorMode = () => {
  const [mode, setMode] =
    useState<ReturnType<typeof getColorMode>>(getColorMode());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMode(getColorMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return mode;
};

const getColorMode = () => {
  if (document.documentElement.classList.contains("figma-light")) {
    return "light";
  }

  if (document.documentElement.classList.contains("figma-dark")) {
    return "dark";
  }

  return "light";
};
