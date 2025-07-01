import Fetch from "../Fetch";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Fetch utility", () => {
  const baseUrl = process.env.API_URL || "";

  it("Fetch.get should return success with data on 200 response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: "test data" }),
    });

    const response = await Fetch.get({ url: "/test", params: { q: "search" } });

    expect(global.fetch).toHaveBeenCalledWith(
      baseUrl + "/test?q=search",
      expect.objectContaining({ method: "GET", credentials: "include" })
    );
    expect(response).toEqual({
      status: "success",
      result: { data: "test data" },
    });
  });

  it("Fetch.post should send body and headers and return success", async () => {
    const postData = { name: "John" };
    const headers = { "Content-Type": "application/json" };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 123 }),
    });

    const response = await Fetch.post({
      url: "/users",
      params: JSON.stringify(postData),
      headers,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      baseUrl + "/users",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postData),
        headers,
      })
    );
    expect(response).toEqual({ status: "success", result: { id: 123 } });
  });

  it("Fetch.get should return error status and message on non 200 response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Not Found" }),
    });

    const response = await Fetch.get({ url: "/notfound" });

    expect(response).toEqual({ status: "error", result: "Not Found" });
  });

  it("Fetch.request should handle fetch throwing an error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(Fetch.get({ url: "/error" })).rejects.toThrow("Network error");
  });
});
