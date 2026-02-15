import { describe, expect, test } from "vitest";

import { interpolateObjects } from "src/root/functions/taggedTemplate";

describe("interpolateObject", () => {
  test("Returns the stringified object when passed a single object in a single string", () => {
    expect(interpolateObjects`${{ Hello: "world!" }}`).toBe(JSON.stringify({ Hello: "world!" }));
  });
  test("Returns the stringified objects in order in a single string", () => {
    const firstObject = { firstKey: "First value" };
    const secondObject = { secondKey: "Second value" };
    expect(interpolateObjects`${firstObject}${secondObject}`).toBe(
      `${JSON.stringify(firstObject)}${JSON.stringify(secondObject)}`,
    );
  });
  test("Interpolates the objects in the correct position in the string as a whole", () => {
    const firstObject = { firstKey: "First value" };
    const secondObject = { secondKey: "Second value" };
    expect(interpolateObjects`${firstObject}, then some more text, then ${secondObject}`).toBe(
      `${JSON.stringify(firstObject)}, then some more text, then ${JSON.stringify(secondObject)}`,
    );
    expect(
      interpolateObjects`Start with some text, then ${firstObject}, then some more text, then ${secondObject}`,
    ).toBe(
      `Start with some text, then ${JSON.stringify(firstObject)}, then some more text, then ${JSON.stringify(secondObject)}`,
    );
  });
  test("Only stringify objects and arrays", () => {
    expect(
      interpolateObjects`I have a string ${"Hello"}, I have a number ${1}, UGH! Object record ${{ Hello: 1 }}! I have a number ${1}, I have a string ${"Hello"}, UGH! Array of string ${["Hello!"]}!`,
    ).toBe(
      `I have a string ${"Hello"}, I have a number ${1}, UGH! Object record ${JSON.stringify({ Hello: 1 })}! I have a number ${1}, I have a string ${"Hello"}, UGH! Array of string ${JSON.stringify(["Hello!"])}!`,
    );
  });
  test("Do not stringify null", () => {
    expect(interpolateObjects`Why is ${null} considered object? That's stupid!`).toBe(
      `Why is null considered object? That's stupid!`,
    );
  });
});
