import { describe, expect, expectTypeOf, test } from "vitest";

import {
  createTemplateStringsArray,
  getRandomNumber,
  getStringsAndInterpolations,
  interpolate,
} from "src/root/functions";
import { DataError } from "src/root/types";

describe("getStringsAndInterpolations", () => {
  test("Returns the strings and interpolations from a given template string separately", () => {
    expect(getStringsAndInterpolations`Hello ${"world"} test ${1}.`).toEqual([
      createTemplateStringsArray(["Hello ", " test ", "."]),
      "world",
      1,
    ]);
  });

  test("Returns the strings and interpolations directly when given separately", () => {
    expect(
      getStringsAndInterpolations(
        createTemplateStringsArray(["Hello ", " test ", "."]),
        "world",
        1,
      ),
    ).toEqual([createTemplateStringsArray(["Hello ", " test ", "."]), "world", 1]);
  });

  test("The result can be spread directly into another tagged template function", () => {
    expect(interpolate(...getStringsAndInterpolations`Hello ${"world"} test ${1}.`)).toBe(
      "Hello world test 1.",
    );
  });

  test("Has proper type narrowing for the interpolations", () => {
    const [strings, ...interpolations] =
      getStringsAndInterpolations`Hello ${"world"} test ${getRandomNumber(1, 10)}.`;
    expectTypeOf(strings).toEqualTypeOf<TemplateStringsArray>();
    expectTypeOf(interpolations).toEqualTypeOf<["world", number]>();
  });

  describe("Throws an error if the strings length is not exactly one more than the interpolations length", () => {
    test.each([
      ["strings is too long", createTemplateStringsArray(["Hello ", " test ", "."]), [1]],
      ["interpolations is too long", createTemplateStringsArray(["Hello"]), [1, 2, 3, 4]],
      [
        "strings and interpolations are the same length",
        createTemplateStringsArray(["Hello ", " test ", "."]),
        ["world", 1, 2],
      ],
    ])("Throws an error if %s", (_, strings, interpolations) => {
      const error = DataError.expectError(() => {
        getStringsAndInterpolations(strings, ...interpolations);
      });

      expect(error.data?.stringsLength).toBe(strings.length);
      expect(error.data.interpolationsLength).toBe(interpolations.length);
      expect(error.data.strings).toEqual(strings);
      expect(error.data.interpolations).toEqual(interpolations);
      expect(error.code).toBe("INVALID_STRINGS_AND_INTERPOLATIONS_LENGTH");
    });
  });
});
