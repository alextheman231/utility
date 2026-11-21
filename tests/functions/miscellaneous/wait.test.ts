import { afterAll, beforeAll, describe, expect, test, vitest } from "vitest";

import wait from "src/root/functions/miscellaneous/wait";

beforeAll(() => {
  vitest.useFakeTimers();
});

afterAll(() => {
  vitest.useRealTimers();
});

describe("wait", () => {
  test("Resolves after the given amount of time", async () => {
    const mockFunction = vitest.fn();
    void wait(2).then(mockFunction);

    vitest.advanceTimersByTime(1000);
    expect(mockFunction).not.toHaveBeenCalled();

    vitest.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(mockFunction).toHaveBeenCalled();
  });
});
