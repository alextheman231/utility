import { describe, expect, test } from "vitest";

import { randomUUID } from "node:crypto";

import { DataError } from "src/root";
import parseUUID from "src/root/functions/parsers/parseUUID";

describe("parseUUID", () => {
  test("Return the UUID if it is valid", () => {
    const uuid = randomUUID();
    const parsedUUID = parseUUID(uuid);
    expect(parsedUUID).toBe(uuid);
  });
  test("Throws a DataError if input is not a valid UUID", () => {
    const error = DataError.expectError(() => {
      parseUUID("hello");
    });
    expect(error.data.input).toBe("hello");
    expect(error.code).toBe("INVALID_UUID");
  });
  test("Throws a DataError if input is not a string", () => {
    const error = DataError.expectError(() => {
      parseUUID(1);
    });
    expect(error.data.input).toBe(1);
    expect(error.code).toBe("INVALID_TYPE");
  });
});
