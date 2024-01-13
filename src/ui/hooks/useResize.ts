import { useEffect } from "react";

export const useResize = (
  callback: (width: number, height: number) => void,
) => {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      callback(root.scrollWidth, root.scrollHeight + 1);
    });

    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [callback]);
};
