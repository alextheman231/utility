import { describe, expect, test } from "vitest";

import { normaliseIndents, normalizeIndents } from "src/root/index";

describe("normaliseIndents", () => {
  test("Strips weird indents when creating new lines in template strings", () => {
    expect(normaliseIndents`Hello
            world`).toBe("Hello\nworld");
  });
  test("Calculates indentation level based on the length of the second line if first line is not empty", () => {
    expect(normaliseIndents`Hello
        world
            This is a test`).toBe("Hello\nworld\n    This is a test");
    expect(normaliseIndents`Hello
            world
                This is a test`).toBe("Hello\nworld\n    This is a test");
  });
  test("Calculates indentation level based on the length of the first non-blank line and removes first line if empty, preserving other empty lines", () => {
    expect(normaliseIndents`
              Hello
              world
                  This is a test`).toBe("Hello\nworld\n    This is a test");
    expect(normaliseIndents`
  
              Hello
              world
                  This is a test`).toBe("\nHello\nworld\n    This is a test");
    expect(normaliseIndents`

              ${""}

              Hello
              world
                  This is a test`).toBe("\n\n\nHello\nworld\n    This is a test");
  });
  test("Maintains intentional indents", () => {
    expect(normaliseIndents`Hello
            world
                test`).toBe("Hello\nworld\n    test");
  });
  test("Deals with empty lines", () => {
    expect(normaliseIndents`Hello
            
            world`).toBe("Hello\n\nworld");
  });
  test("Deals with interpolations", () => {
    expect(normaliseIndents`Hello
            world
            ${"An interpolation"}
                ${1} indent here
                    ${2} indents here
                    An indented line with ${1} interpolation in the middle`).toBe(
      "Hello\nworld\nAn interpolation\n    1 indent here\n        2 indents here\n        An indented line with 1 interpolation in the middle",
    );
  });
  test("If given preserveTabs option, return a new function that takes the template string with the options applied", () => {
    expect(normaliseIndents({ preserveTabs: false })`Hello
            world
                Please ignore tabs`).toBe("Hello\nworld\nPlease ignore tabs");
    expect(normaliseIndents({ preserveTabs: false })`Hello
            world
                ${"An interpolation"}
                A ${2}nd interpolation
                    Please ignore tabs`).toBe(
      "Hello\nworld\nAn interpolation\nA 2nd interpolation\nPlease ignore tabs",
    );
  });
  test("Works with the spelling of normalizeIndents", () => {
    expect(normalizeIndents`
      Hello
      world`).toBe("Hello\nworld");
  });
});
