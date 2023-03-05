import { useEffect } from "react";

export const useResize = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      callback();
    });

    const target = ref.current;

    if (target !== null) {
      observer.observe(target);
    }

    return () => {
      if (target !== null) {
        observer.unobserve(target);
      }
    };
  }, [callback]);
};
