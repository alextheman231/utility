import { describe, expect, test } from "vitest";

import { secondsToMs } from "src/root";

describe("secondsToMs", () => {
  test.each<[number, number]>([
    [1, 1000],
    [2, 2000],
    [3, 3000],
  ])(
    "Converts seconds to milliseconds by multiplying by 1000. (testing secondsToMs(%d) = %d)",
    (input, output) => {
      expect(secondsToMs(input)).toBe(output);
    },
  );
});
