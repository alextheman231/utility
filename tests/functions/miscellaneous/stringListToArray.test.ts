import { describe, expect, test } from "vitest";

import { stringListToArray } from "src/root/functions";

describe("stringListToArray", () => {
  test("Returns empty array for empty string", () => {
    expect(stringListToArray("")).toEqual([]);
  });
  test("Turns a string with one item in it to an array", () => {
    expect(stringListToArray("Hello")).toEqual(["Hello"]);
  });
  test("Separates the string list by comma by default", () => {
    expect(stringListToArray("Hello,world,test")).toEqual(["Hello", "world", "test"]);
  });
  test("Trims any trailing whitespace", () => {
    expect(stringListToArray("Hello , world , test")).toEqual(["Hello", "world", "test"]);
  });
  test("Can configure a separator", () => {
    expect(stringListToArray("Hello;world;test", { separator: ";" })).toEqual([
      "Hello",
      "world",
      "test",
    ]);
  });
  test("Works with multi-character separators", () => {
    expect(stringListToArray("Hello||world||test", { separator: "||" })).toEqual([
      "Hello",
      "world",
      "test",
    ]);
  });
  test("Can disable whitespace trimming", () => {
    expect(stringListToArray("Hello , world , test", { trimWhitespace: false })).toEqual([
      "Hello ",
      " world ",
      " test",
    ]);
  });
  test("Returns empty array for string that turns into empty string when trimmed", () => {
    expect(stringListToArray(" ")).toEqual([]);
  });
  test("Does not return empty array for string that turns into empty string when trimmed and trimWhitespace is false", () => {
    expect(stringListToArray(" ", { trimWhitespace: false })).toEqual([" "]);
  });
});
