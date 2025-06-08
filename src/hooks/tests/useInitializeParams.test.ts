import { renderHook } from "@testing-library/react";
import useInitializeParams from "@/hooks/useInitializeParams";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/test",
  useSearchParams: () => new URLSearchParams("a=123&b=456"),
}));

afterEach(() => {
  replaceMock.mockReset();
});

describe("useInitializeParams", () => {
  it("adds missing parameters and calls replace", () => {
    const { result } = renderHook(() => useInitializeParams());

    result.current([
      { param: "a", init: "initA" },
      { param: "c", init: "initC" },
    ]);

    expect(replaceMock).toHaveBeenCalledWith("/test?a=123&b=456&c=initC");
  });

  it("does nothing if all params exist", () => {
    const { result } = renderHook(() => useInitializeParams());

    result.current([
      { param: "a", init: "nope" },
      { param: "b", init: "nope" },
    ]);

    expect(replaceMock).toHaveBeenCalledWith("/test?a=123&b=456");
  });
});
