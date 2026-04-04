import { describe, expect, test } from "vitest";

import { toTitleCase } from "src/root";

describe("toTitleCase", () => {
  test("Captalises the first letter of a single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });
  test.each<[string, string]>([
    ["uppercase", "HELLO WORLD"],
    ["lowercase", "hello world"],
    ["mixed case", "heLlo WorLd"],
    ["kebab-case", "hello-world"],
    ["lower_snake_case", "hello_world"],
    ["UPPER_SNAKE_CASE", "HELLO_WORLD"],
  ])("Normalises %s inputs", (_, input) => {
    expect(toTitleCase(input)).toBe("Hello World");
  });
  test.each<[string, string]>([
    ["at the start", " My Title Converter"],
    ["at the end", "My Title Converter "],
  ])("Trims whitespace %s", (_, input) => {
    expect(toTitleCase(input)).toBe("My Title Converter");
  });
  test("Leaves an empty string as is", () => {
    expect(toTitleCase("")).toBe("");
  });
  test("Returns an empty string for anything that trims to be an empty string", () => {
    expect(toTitleCase(" ")).toBe("");
  });
  test.each<[Array<string>, string, string]>([
    [["API"], "API_ERROR", "API Error"],
    [["the"], "sonic the hedgehog", "Sonic the Hedgehog"],
    [["to", "the", "CI"], "going to the ci logs", "Going to the CI Logs"],
  ])(
    "Uses the specified casing in preserveWords option (testing the preservation of '%s' in '%s')",
    (preserveWords, title, expectedResult) => {
      expect(toTitleCase(title, { preserveWords })).toBe(expectedResult);
    },
  );
});
