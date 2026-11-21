import type { ZodType } from "zod";

import z from "zod";

function zodFieldWrapper<SchemaType extends ZodType<unknown, string | null>>(
  schema: SchemaType,
): ZodType<z.infer<SchemaType>, string> {
  return z
    .string()
    .trim()
    .transform((value) => {
      return value === "" ? null : value;
    })
    .pipe(schema);
}

export default zodFieldWrapper;
