import { describe, expect, test } from "vitest";

import minutesToMs from "src/root/functions/date/minutesToMs";

describe("minutesToMs", () => {
  test.each<[number, number]>([
    [1, 60000],
    [2, 120000],
    [3, 180000],
  ])(
    "Converts minutes to milliseconds by multiplying by 60, then 1000. (testing minutesToMs(%d) = %d)",
    (input, output) => {
      expect(minutesToMs(input)).toBe(output);
    },
  );
});
