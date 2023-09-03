import { useEffect } from "preact/hooks";

export const useResize = (
  target: HTMLElement,
  callback: (width: number, height: number) => void,
) => {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      callback(target.clientWidth, target.clientHeight);
    });

    if (target !== null) {
      observer.observe(target);
    }

    return () => {
      if (target !== null) {
        observer.unobserve(target);
      }
    };
  }, [callback, target]);
};
