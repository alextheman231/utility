import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";

import wait from "src/root/functions/miscellaneous/wait";

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe("wait", () => {
  test("Resolves after the given amount of time", async () => {
    const mockFunction = vi.fn();
    wait(2).then(mockFunction);

    vi.advanceTimersByTime(1000);
    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(mockFunction).toHaveBeenCalled();
  });
});
