import { describe, expect, expectTypeOf, test } from "vitest";

import {
  createTemplateStringsArray,
  getRandomNumber,
  getStringsAndInterpolations,
  interpolate,
} from "src/functions";
import { DataError } from "src/types";

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
      try {
        getStringsAndInterpolations(strings, ...interpolations);
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          // TODO for v5 - make DataError take a Record<RecordType, unknown> for data only
          const { data } = error as { data: Record<string, unknown> };
          if (typeof data === "object") {
            expect(data?.stringsLength).toBe(strings.length);
            expect(data.interpolationsLength).toBe(interpolations.length);
            expect(data.strings).toEqual(strings);
            expect(data.interpolations).toEqual(interpolations);
            expect(error.code).toBe("INVALID_STRINGS_AND_INTERPOLATIONS_LENGTH");
          }
        } else {
          throw error;
        }
      }
    });
  });
});
