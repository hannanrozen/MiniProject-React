import api from "../../services/api";

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: { test: "data" } })),
    post: jest.fn(() => Promise.resolve({ data: { test: "data" } })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe("API Service", () => {
  test("api instance is created", () => {
    expect(api).toBeDefined();
  });

  test("api has get method", () => {
    expect(typeof api.get).toBe("function");
  });

  test("api has post method", () => {
    expect(typeof api.post).toBe("function");
  });

  test("api can make get request", async () => {
    const response = await api.get("/test");
    expect(response.data.test).toBe("data");
  });

  test("api can make post request", async () => {
    const response = await api.post("/test", { data: "test" });
    expect(response.data.test).toBe("data");
  });
});
