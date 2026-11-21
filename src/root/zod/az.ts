import type { ZodCoercedDate, ZodCoercedNumber, ZodType } from "zod";

import type { VersionNumber } from "src/root/types";
import type { DataError } from "src/v6";

import z from "zod";

import { zodVersionNumber } from "src/root/types";
import parseZodSchema from "src/root/zod/parseZodSchema";
import parseZodSchemaAsync from "src/root/zod/parseZodSchemaAsync";
import zodFieldWrapper from "src/root/zod/zodFieldWrapper";

export type AzParsingErrorHandler<ErrorType extends Error = DataError> =
  | ErrorType
  | ((zodError: z.ZodError) => void | ErrorType);

const az = {
  field: zodFieldWrapper,
  fieldNumber: (): ZodCoercedNumber<string | null> => {
    return z.coerce.number<string | null>();
  },
  versionNumber: (): ZodType<VersionNumber> => {
    return zodVersionNumber;
  },
  fieldDate: (): ZodCoercedDate<string | null> => {
    return z.coerce.date<string | null>();
  },
  with: <SchemaType extends ZodType>(schema: SchemaType) => {
    return {
      parse: <ErrorType extends Error = DataError>(
        input: unknown,
        error?: AzParsingErrorHandler<ErrorType>,
        // oxlint-disable-next-line typescript/no-deprecated -- This wrapper needs the base implementation to work. The base parseZodSchema will be demoted to a non-exported internal function in v6.
      ): ReturnType<typeof parseZodSchema<SchemaType, ErrorType>> => {
        // oxlint-disable-next-line typescript/no-deprecated -- This wrapper needs the base implementation to work. The base parseZodSchema will be demoted to a non-exported internal function in v6.
        return parseZodSchema<SchemaType, ErrorType>(schema, input, error);
      },
      parseAsync: async <ErrorType extends Error = DataError>(
        input: unknown,
        error?: AzParsingErrorHandler<ErrorType>,
        // oxlint-disable-next-line typescript/no-deprecated -- This wrapper is expected to replace this implementation. The base parseZodSchemaAsync will be demoted to a non-exported internal function in v6.
      ): ReturnType<typeof parseZodSchemaAsync<SchemaType, ErrorType>> => {
        // oxlint-disable-next-line typescript/no-deprecated -- This wrapper is expected to replace this implementation. The base parseZodSchemaAsync will be demoted to a non-exported internal function in v6.
        return await parseZodSchemaAsync<SchemaType, ErrorType>(schema, input, error);
      },
    };
  },
};

export default az;
