import type { ZodError, ZodSafeParseResult, ZodType } from "zod";

import z from "zod";

import { DataError } from "src/v6";

export interface ZodParsingErrorData {
  input: unknown;
  issues: Array<z.core.$ZodIssue>;
}

// eslint-disable-next-line jsdoc/require-jsdoc -- No need for JSDoc on this one - it is only an internal helper function.
function _parseZodSchema<SchemaType extends ZodType, ErrorType extends Error = DataError>(
  parsedResult: ZodSafeParseResult<z.infer<SchemaType>>,
  input: unknown,
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

    throw new DataError<ZodParsingErrorData, "ZOD_ERROR">(
      { input, issues: parsedResult.error.issues },
      "ZOD_ERROR",
      `\n\n${z.prettifyError(parsedResult.error)}\n`,
    );
  }
  return parsedResult.data;
}

export default _parseZodSchema;
