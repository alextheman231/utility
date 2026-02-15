import { describe, expect, test } from "vitest";

import { parseIntStrict } from "src/root/functions";
import { DataError } from "src/root/types";

describe("parseIntStrict", () => {
  test("Returns the parsed integer", () => {
    expect(parseIntStrict("2")).toBe(2);
  });
  test("Works with the optional radix argument", () => {
    // Returns 2 because 10 in base 2 is 2
    expect(parseIntStrict("10", 2)).toBe(2);
  });
  test("Allows negative numbers", () => {
    expect(parseIntStrict("-2")).toBe(-2);
  });
  test("Allows valid base 16 notation", () => {
    expect(parseIntStrict("1a", 16)).toBe(26);
  });
  test("Throws a TypeError if parsed result is not an integer", () => {
    try {
      parseIntStrict("Hello");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data).toBe("Hello");
        expect(error.code).toBe("INTEGER_PARSING_ERROR");
        expect(error.message).toBe("Only numeric values are allowed.");
      } else {
        throw error;
      }
    }
  });
  test.each(["3.14", "3a", "a3", "3+1"])(
    "Fails if the input contains any non-numeric characters other than '-' (testing %s)",
    (stringToParse: string) => {
      try {
        parseIntStrict(stringToParse);
        throw new Error("TEST_FAILED");
      } catch (error) {
        if (error instanceof DataError) {
          expect(error.data).toBe(stringToParse);
          expect(error.code).toBe("INTEGER_PARSING_ERROR");
          expect(error.message).toBe("Only numeric values are allowed.");
        } else {
          throw error;
        }
      }
    },
  );
  test("Fails if the letter is outside what is allowed in the base system", () => {
    try {
      parseIntStrict("1g", 16);
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data).toEqual({ string: "1g", radix: 16 });
        expect(error.code).toBe("INTEGER_PARSING_ERROR");
        expect(error.message).toBe("Only numeric values or characters A-F are allowed.");
      } else {
        throw error;
      }
    }
  });
  test("Fails if the number is outside the base system", () => {
    try {
      parseIntStrict("12", 2);
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data).toEqual({ string: "12", radix: 2 });
        expect(error.code).toBe("INTEGER_PARSING_ERROR");
        expect(error.message).toBe(
          "Value contains one or more digits outside of the range of the given radix.",
        );
      } else {
        throw error;
      }
    }
  });
  test("Fails if given an empty string", () => {
    try {
      parseIntStrict("");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data).toBe("");
        expect(error.code).toBe("INTEGER_PARSING_ERROR");
        expect(error.message).toBe("Only numeric values are allowed.");
      } else {
        throw error;
      }
    }
  });
  test("Fails if given a string that trims to be an empty string", () => {
    try {
      parseIntStrict(" ");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data).toBe(" ");
        expect(error.code).toBe("INTEGER_PARSING_ERROR");
        expect(error.message).toBe("Only numeric values are allowed.");
      } else {
        throw error;
      }
    }
  });
});
