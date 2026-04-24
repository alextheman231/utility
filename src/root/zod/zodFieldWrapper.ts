import type { ZodType } from "zod";

import z from "zod";

// eslint-disable-next-line jsdoc/require-jsdoc -- Not worth adding here as it won't show. Instead, we should add it to the implementation on az directly.
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
