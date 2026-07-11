import { describe, expect, test } from "vitest";

import { memoizeAsync } from "src/root";

describe("memoizeAsync", () => {
  test("Memoizes a Promise.", async () => {
    const memoized = memoizeAsync(async () => {
      return "hello";
    });
    const result = await memoized();

    expect(result).toBe("hello");
  });
  test("If memoizing the same Promise, memoize the same instance.", async () => {
    let count = 0;

    const memoized = memoizeAsync(async () => {
      count++;
      return "hello";
    });

    const firstPromise = memoized();
    const secondPromise = memoized();

    expect(firstPromise).toBe(secondPromise);

    const [firstResult, secondResult] = await Promise.all([firstPromise, secondPromise]);
    expect(firstResult).toBe(secondResult);
    expect(count).toBe(1);
  });
  test("Forwards the callback arguments", async () => {
    const memoized = memoizeAsync(async (input) => {
      return input;
    });

    const result = await memoized("hello");

    expect(result).toBe("hello");
  });
  test("Ignores arguments after the first invocation.", async () => {
    const memoized = memoizeAsync(async (input) => {
      return input;
    });

    const firstResult = await memoized("first");
    const secondResult = await memoized("second");

    expect(firstResult).toBe("first");
    expect(secondResult).toBe("first");
  });
});
