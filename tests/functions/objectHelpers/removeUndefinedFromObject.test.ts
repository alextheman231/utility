import { describe, expect, test } from "vitest";

import removeUndefinedFromObject from "src/root/functions/objectHelpers/removeUndefinedFromObject";

describe("removeUndefinedFromObject", () => {
  test("Leaves an object as is if there are no undefined entries", () => {
    const input = {
      first: "First",
      second: 2,
    };

    expect(removeUndefinedFromObject(input)).toEqual(input);
  });

  test("Removes undefined entries from a given object", () => {
    const input = {
      first: "First",
      second: 2,
      isUndefined: undefined,
    };

    expect(removeUndefinedFromObject(input)).toEqual({
      first: "First",
      second: 2,
    });
  });

  test("Does not mutate the input", () => {
    const input = Object.freeze({
      first: "First",
      second: 2,
      isUndefined: undefined,
    });

    removeUndefinedFromObject(input);

    expect(input).toEqual({
      first: "First",
      second: 2,
      isUndefined: undefined,
    });
  });

  test("Returns an object with a different reference in memory", () => {
    const input = {
      first: "First",
      second: 2,
    };

    const output = removeUndefinedFromObject(input);

    expect(input).not.toBe(output);
  });
});
