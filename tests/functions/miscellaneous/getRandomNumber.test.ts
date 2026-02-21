import { describe, expect, test, vi } from "vitest";

import { DataError } from "src/root";
import getRandomNumber from "src/root/functions/miscellaneous/getRandomNumber";

describe("getRandomNumber", () => {
  test("Returns an integer", () => {
    const randomNumber = getRandomNumber(0, 10);
    expect(randomNumber % 1).toBe(0);
  });
  test("Generates a random number within the specified range", () => {
    const randomNumber = getRandomNumber(0, 10);
    expect(randomNumber >= 0 && randomNumber <= 10).toBe(true);
  });
  test("Gives a random number", () => {
    const spy = vi.spyOn(Math, "random");
    spy.mockImplementationOnce(() => {
      return 0.5;
    });
    const randomNumber = getRandomNumber(0, 10);
    expect(randomNumber).toBe(5);
  });
  test("Throw an error if inputs are not integers", () => {
    const error = DataError.expectError(() => {
      getRandomNumber(0.5, 10.5);
    });
    expect(error.code).toBe("INTEGER_PARSING_ERROR");
  });
});
