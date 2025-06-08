import { act, renderHook } from "@testing-library/react";
import useFetchedData from "@/hooks/useFetchedData";

const flushPromises = () =>
  act(() => new Promise((resolve) => setTimeout(resolve, 0)));
describe("useFetchedData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data and updates states", async () => {
    const mockData = { message: "random text" };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetchedData<typeof mockData>(""));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await flushPromises();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useFetchedData(""));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await flushPromises();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe("fail");
  });
});
