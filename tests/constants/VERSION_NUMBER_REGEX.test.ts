import { describe, expect, test } from "vitest";

import { VERSION_NUMBER_REGEX } from "src/root/constants";

describe("VERSION_NUMBER_REGEX", () => {
  const constructedRegex = RegExp(VERSION_NUMBER_REGEX);
  test('Matches version numbers not prefixed "v"', () => {
    expect(constructedRegex.test("1.2.3")).toBe(true);
  });
  test('Matches version numbers prefixed "v"', () => {
    expect(constructedRegex.test("v1.2.3")).toBe(true);
  });
  test("Does not match partial version numbers (e.g. 1.2, with the patch implied to be 0)", () => {
    expect(constructedRegex.test("1.2")).toBe(false);
    expect(constructedRegex.test("v1.2")).toBe(false);
  });
  test("Does not match version numbers with leading zeros", () => {
    expect(constructedRegex.test("01.2.3")).toBe(false);
    expect(constructedRegex.test("v1.02.3")).toBe(false);
  });
  test("Matches version numbers with significant zeroes", () => {
    expect(constructedRegex.test("1.10.1")).toBe(true);
    expect(constructedRegex.test("v1.10.1")).toBe(true);
  });
  test("Does not match obviously nonsensical version numbers", () => {
    expect(constructedRegex.test("hello")).toBe(false);
  });
});
