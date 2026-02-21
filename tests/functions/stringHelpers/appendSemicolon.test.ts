import { describe, expect, test } from "vitest";

import { DataError, normaliseIndents } from "src/root";
import appendSemicolon from "src/root/functions/stringHelpers/appendSemicolon";

describe("appendSemicolon", () => {
  test("Appends a semicolon to the end of string if not present", () => {
    const output = appendSemicolon('console.log("Hello world")');
    expect(output).toBe('console.log("Hello world");');
  });
  test("Leaves the string as is if semicolon already present", () => {
    const output = appendSemicolon('console.log("Hello world");');
    expect(output).toBe('console.log("Hello world");');
  });
  test("Gets rid of trailing whitespace before inserting semicolon", () => {
    const output = appendSemicolon('console.log("Hello world") ');
    expect(output).toBe('console.log("Hello world");');
  });
  test("Throw an error if more than one line is given", () => {
    const input = normaliseIndents`
          console.log("Hello world")
          const myVariable = "Hello world"
        `;
    const error = DataError.expectError(() => {
      appendSemicolon(input);
    });

    expect(error.data.stringToAppendTo).toBe(input);
    expect(error.code).toBe("MULTIPLE_LINE_ERROR");
  });
  test("Return an empty string if given an empty string", () => {
    const output = appendSemicolon("");
    expect(output).toBe("");
  });
  test("Return an empty string if given a string with only whitespace", () => {
    const output = appendSemicolon(" ");
    expect(output).toBe("");
    const outputWithMultipleSpacesInInput = appendSemicolon("  ");
    expect(outputWithMultipleSpacesInInput).toBe("");
  });
});
