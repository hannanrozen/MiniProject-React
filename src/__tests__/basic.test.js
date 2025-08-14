// Simple test to verify Jest is working
describe("Basic Jest Setup", () => {
  test("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  test("should handle string concatenation", () => {
    expect("hello" + " world").toBe("hello world");
  });
});
