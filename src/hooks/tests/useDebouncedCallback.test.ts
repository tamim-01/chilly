import { renderHook, act } from "@testing-library/react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";

jest.useFakeTimers();

describe("useDebouncedCallback", () => {
  it("should debounce the callback and call it only once after delay", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current("first");
      result.current("second");
      result.current("final");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("final");
  });

  it("resets the timer on every call", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 200));

    act(() => {
      result.current("1");
      jest.advanceTimersByTime(100);
      result.current("2");
      jest.advanceTimersByTime(100);
      result.current("3");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("3");
  });
});
