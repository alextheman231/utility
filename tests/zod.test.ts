import { describe, expect, test } from "vitest";
import z from "zod";

import { az, isSameDate, parseZodSchema } from "src/root";

describe("zodFieldWrapper", () => {
  test("Converts an empty string to null", () => {
    const schema = az.field(z.string().nullable());
    const result = az.parse(schema, "");
    expect(result).toBeNull();
  });
  test("Converts a coerced field number into a number", () => {
    const schema = az.field(az.fieldNumber().int());
    const result = parseZodSchema(schema, "1");
    expect(result).toBe(1);
  });
  test("Converts a coerced field date into a date", () => {
    const today = new Date();
    const schema = az.field(az.fieldDate());
    const result = az.parse(schema, today.toISOString());
    expect(result).toBeInstanceOf(Date);
    expect(isSameDate(today, result)).toBe(true);
  });
});
