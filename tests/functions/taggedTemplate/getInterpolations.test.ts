import { describe, expect, test } from "vitest";

import { createTemplateStringsArray } from "src/root/functions";
import getInterpolations from "src/root/functions/taggedTemplate/getInterpolations";

describe("getInterpolations", () => {
  test("Returns the strings and interpolations from a given template string separately", () => {
    expect(getInterpolations`Hello ${"world"} test ${1}.`).toEqual([
      ["Hello ", " test ", "."],
      ["world", 1],
    ]);
  });
  test("Returns the strings and interpolations directly when given separately", () => {
    expect(
      getInterpolations(createTemplateStringsArray(["Hello ", " test ", "."]), "world", 1),
    ).toEqual([createTemplateStringsArray(["Hello ", " test ", "."]), ["world", 1]]);
  });
});
