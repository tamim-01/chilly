import { useCallback, useRef } from "react";

function useDebouncedCallback<T>(
  callback: (...args: T[]) => void,
  delay: number
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<NodeJS.Timeout>(null);
  return useCallback(
    (...args: T[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}
export default useDebouncedCallback;
