import { renderHook } from "@testing-library/react";
import useSetParams from "@/hooks/useSetParams";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/menu",
  useSearchParams: () => new URLSearchParams("lang=en&page=1"),
}));

afterEach(() => {
  replaceMock.mockReset();
});

describe("useSetParams", () => {
  it("adds new param", () => {
    const { result } = renderHook(() => useSetParams());
    result.current("category", "pizza");

    expect(replaceMock).toHaveBeenCalledWith(
      "/menu?lang=en&page=1&category=pizza"
    );
  });

  it("updates existing param", () => {
    const { result } = renderHook(() => useSetParams());
    result.current("page", "2");

    expect(replaceMock).toHaveBeenCalledWith("/menu?lang=en&page=2");
  });

  it("removes param", () => {
    const { result } = renderHook(() => useSetParams());
    result.current("page", null);

    expect(replaceMock).toHaveBeenCalledWith("/menu?lang=en");
  });
});
