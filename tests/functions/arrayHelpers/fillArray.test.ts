import { describe, expect, expectTypeOf, test } from "vitest";

import { wait } from "src/root/functions";
import { fillArray } from "src/root/functions/arrayHelpers";

describe("fillArray", () => {
  test("Fills the array with the result of the passed-in function", () => {
    expect(
      fillArray(() => {
        return "Hello";
      }, 5),
    ).toEqual(["Hello", "Hello", "Hello", "Hello", "Hello"]);
  });
  test("Defaults to a length of 1 if length not provided", () => {
    expect(
      fillArray(() => {
        return "Hello";
      }),
    ).toEqual(["Hello"]);
  });
  test("Gives the callback access to the index", () => {
    expect(
      fillArray((index) => {
        return index;
      }, 5),
    ).toEqual([0, 1, 2, 3, 4]);
  });
  test("Works with async functions", async () => {
    const result = fillArray(async (index) => {
      await wait(0.1);
      return index;
    }, 5);

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toEqual([0, 1, 2, 3, 4]);
  });
  test("Treats mixed sync/async results as async", async () => {
    const result = fillArray((index) => {
      return index === 1 ? Promise.resolve(index) : index;
    }, 3);

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toEqual([0, 1, 2]);
  });
  test("Infers correct types", async () => {
    expectTypeOf(
      fillArray(() => {
        return "Hello";
      }),
    ).toEqualTypeOf<Array<string>>();

    expectTypeOf(
      fillArray(async () => {
        await wait(0.1);
        return "Hello";
      }),
    ).toEqualTypeOf<Promise<Array<string>>>();
  });
  test("Runs in parallel by default", async () => {
    const order: Array<number> = [];

    const result = await fillArray(async (index) => {
      await wait((10 - index * 2) / 1000);
      order.push(index);
      return index;
    }, 3);

    expect(result).toEqual([0, 1, 2]);
    expect(order).not.toEqual([0, 1, 2]);
  });
  test("Resolves sequentially when sequential option is true.", async () => {
    const executionOrder: Array<number> = [];

    const result = await fillArray(
      async (i) => {
        executionOrder.push(i);
        await wait(0.005);
        return i;
      },
      3,
      { sequential: true },
    );

    expect(result).toEqual([0, 1, 2]);
    expect(executionOrder).toEqual([0, 1, 2]);
  });
  test("Does not start next task until previous resolves in sequential mode.", async () => {
    const timestamps: Array<number> = [];

    await fillArray(
      async () => {
        timestamps.push(Date.now());
        await wait(0.02);
      },
      3,
      { sequential: true },
    );

    const diffs = timestamps.slice(1).map((timestamp, index) => {
      return timestamp - timestamps[index];
    });
    expect(
      diffs.every((diff) => {
        return diff >= 15;
      }),
    ).toBe(true);
  });
});
