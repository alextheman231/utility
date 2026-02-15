import dotenv from "dotenv";
import { describe, expect, test } from "vitest";

import { normaliseIndents } from "src/root/functions";
import stringifyDotenv from "src/root/functions/miscellaneous/stringifyDotenv";
import { DataError } from "src/root/types";

describe("stringifyDotenv", () => {
  test("Stringifies an object into .env file format, using double-quotes by default", () => {
    expect(
      stringifyDotenv({
        HELLO: "world",
        NODE_ENV: "test",
      }),
    ).toBe(normaliseIndents`
            HELLO="world"
            NODE_ENV="test"
        `);
  });

  test("Stringifies an object into .env file format, using single-quotes if that option is specified", () => {
    expect(
      stringifyDotenv(
        {
          HELLO: "world",
          NODE_ENV: "test",
        },
        {
          quoteStyle: "single",
        },
      ),
    ).toBe(normaliseIndents`
            HELLO='world'
            NODE_ENV='test'
        `);
  });

  test("Stringifies an object into .env file format, using no quotes if that option is specified", () => {
    expect(
      stringifyDotenv(
        {
          HELLO: "world",
          NODE_ENV: "test",
        },
        {
          quoteStyle: "none",
        },
      ),
    ).toBe(normaliseIndents`
            HELLO=world
            NODE_ENV=test
        `);
  });

  test.each([
    ["spaces", { HELLO: "my world" }],
    ["#", { INVALID: "Hello #" }],
    ["=", { ALSO_INVALID: "Hello=world" }],
    ["\\", { BACKSLASHES_TOO_UGH: "Hello\\world" }],
  ])("If quoteStyle is none, reject values with %s", (_, input) => {
    try {
      stringifyDotenv(input, { quoteStyle: "none" });
      throw new Error("DID_NOT_THROW");
    } catch (error) {
      if (DataError.check(error)) {
        expect(error.data).toEqual(input);
        expect(error.code).toBe("INCOMPATIBLE_QUOTE_STYLE");
      } else {
        throw error;
      }
    }
  });

  test.each<"double" | "single">(["double", "single"])(
    "Chooses the other quote style when the value contains the preferred quote",
    (quoteStyle) => {
      const quoteCharacter = { double: '"', single: "'" }[quoteStyle];
      const otherQuoteCharacter = { double: "'", single: '"' }[quoteStyle];

      expect(
        stringifyDotenv(
          {
            HELLO: `world ${quoteCharacter}test${quoteCharacter}`,
          },
          { quoteStyle },
        ),
      ).toBe(normaliseIndents`
            HELLO=${otherQuoteCharacter}world ${quoteCharacter}test${quoteCharacter}${otherQuoteCharacter}
        `);
    },
  );

  test("Escapes newline characters", () => {
    expect(
      stringifyDotenv({
        HELLO: normaliseIndents`
            world
            testing
            newlines`,
      }),
    ).toBe(`${String.raw`HELLO="world\ntesting\nnewlines"`}\n`);
  });

  test("Does not allow spaces in key names", () => {
    try {
      stringifyDotenv({
        "HELLO WORLD": "my world",
      });
      throw new Error("DID_NOT_THROW");
    } catch (error) {
      if (DataError.check(error)) {
        expect(error.data).toEqual({ "HELLO WORLD": "my world" });
        expect(error.code).toBe("INVALID_KEY");
      } else {
        throw error;
      }
    }
  });

  test.each<"double" | "single">(["double", "single"])(
    "Is compatible with dotenv.parse() (testing nested %s-quotes)",
    (quoteStyle) => {
      const quoteCharacter = { double: '"', single: "'" }[quoteStyle];

      const inputObject = {
        HELLO: "world",
        BACKSLASH_TEST: String.raw`String with \ backslash`,
        NEWLINE_TEST: normaliseIndents`
        testing
        newlines
        here`,
        NESTED_QUOTES: `Hello, ${quoteCharacter}Alex${quoteCharacter}!`,
      };
      expect(dotenv.parse(stringifyDotenv(inputObject, { quoteStyle }))).toEqual(inputObject);
    },
  );

  test("Is compatible with dotenv.parse() (testing no quotes)", () => {
    const inputObject = {
      HELLO: "world",
      DATABASE_URL: "postgres://test@localhost:5432/test", // Not a real database URL, don't worry!
    };

    expect(dotenv.parse(stringifyDotenv(inputObject, { quoteStyle: "none" }))).toEqual(inputObject);
  });
});
