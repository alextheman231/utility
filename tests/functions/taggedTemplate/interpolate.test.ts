import { describe, expect, test } from "vitest";

import { createTemplateStringsArray, interpolate } from "src/root/index";

describe("interpolate", () => {
  test("Returns the same template string when given a template string", () => {
    expect(interpolate`Hello ${"world"} test ${1}.`).toBe("Hello world test 1.");
  });
  test("Returns the resulting template string when given the strings and interpolations separately", () => {
    expect(interpolate(createTemplateStringsArray(["Hello ", "test ", "."]), "world ", 1)).toBe(
      "Hello world test 1.",
    );
  });
});
