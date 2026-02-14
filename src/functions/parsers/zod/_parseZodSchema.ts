import type { ZodError, ZodSafeParseResult, ZodType } from "zod";

import z from "zod";

import { DataError } from "src/types";

// No need for JSDoc on this one - it is only an internal helper function.
// eslint-disable-next-line jsdoc/require-jsdoc
function _parseZodSchema<SchemaType extends ZodType, ErrorType extends Error = DataError>(
  parsedResult: ZodSafeParseResult<z.infer<SchemaType>>,
  data: unknown,
  onError?: ErrorType | ((zodError: ZodError) => ErrorType | void),
): z.infer<SchemaType> {
  if (!parsedResult.success) {
    if (onError) {
      if (onError instanceof Error) {
        throw onError;
      } else if (typeof onError === "function") {
        const evaluatedError = onError(parsedResult.error);
        if (evaluatedError instanceof Error) {
          throw evaluatedError;
        }
      }
    }

    const allErrorCodes: Record<string, number> = {};

    for (const issue of parsedResult.error.issues) {
      const code = issue.code.toUpperCase();
      allErrorCodes[code] = (allErrorCodes[code] ?? 0) + 1;
    }

    throw new DataError(
      data,
      Object.entries(allErrorCodes)
        .toSorted(([_, firstCount], [__, secondCount]) => {
          return secondCount - firstCount;
        })
        .map(([code, count], _, allErrorCodes) => {
          return allErrorCodes.length === 1 && count === 1 ? code : `${code}×${count}`;
        })
        .join(","),
      `\n\n${z.prettifyError(parsedResult.error)}\n`,
    );
  }
  return parsedResult.data;
}

export default _parseZodSchema;
