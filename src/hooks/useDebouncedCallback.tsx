import { useCallback, useRef } from "react";

const useDebouncedCallback = (
  callback: (...args: string[]) => void,
  delay: number
) => {
  const callbackRef = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout>(null);
  return useCallback(
    (...args: string[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
};
export default useDebouncedCallback;
