import { describe, expect, test } from "vitest";

import truncate from "src/root/functions/stringHelpers/truncate";

describe("truncate", () => {
  test("Returns the same string if the length is less than the maximum length", () => {
    const output = truncate("Hello", 6);
    expect(output).toBe("Hello");
  });
  test("Returns the same string if the length is equal to the maximum length", () => {
    const output = truncate("Hello", 5);
    expect(output).toBe("Hello");
  });
  test("Returns the truncated string followed by ... if the length is longer than the maximum length", () => {
    const output = truncate("Hello World!", 5);
    expect(output).toBe("Hello...");
  });
  test("If no maximum length is provided, default to 5", () => {
    const output = truncate("Hello World!");
    expect(output).toBe("Hello...");
  });
});
