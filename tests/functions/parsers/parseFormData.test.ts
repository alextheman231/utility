import { describe, expect, test } from "vitest";
import z from "zod";

import { createFormData } from "src/root/functions";
import parseFormData from "src/root/functions/parsers/parseFormData";

describe("parseFormData", () => {
  test("Converts formData back into an object", () => {
    const data = {
      firstKey: "First property",
      secondKey: "Second property",
    };
    const formData = createFormData(data);

    const result = parseFormData(formData);
    expect(result).toEqual(data);
  });
  test("Takes a data parser", () => {
    const dataSchema = z.object({
      firstKey: z.string(),
      numberKey: z.coerce.number(),
      arrayKey: z
        .string()
        .transform((value) => {
          return JSON.parse(value);
        })
        .pipe(z.array(z.string())),
    });

    const data = {
      firstKey: "Hello",
      numberKey: "2",
      arrayKey: ["This", "is", "a", "test"],
    };

    const formData = createFormData(data);

    const result = parseFormData(formData, dataSchema.parse);

    expect(result.firstKey).toBe("Hello");
    expect(result.numberKey).toBe(2);
    expect(result.arrayKey).toEqual(["This", "is", "a", "test"]);
  });
});
