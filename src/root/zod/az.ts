import type { ZodCoercedDate, ZodCoercedNumber, ZodType } from "zod";

import type { VersionNumber } from "src/root/types";
import type { DataError } from "src/v6";

import z from "zod";

import { zodVersionNumber } from "src/root/types";
import parseZodSchema from "src/root/zod/parseZodSchema";
import parseZodSchemaAsync from "src/root/zod/parseZodSchemaAsync";
import zodFieldWrapper from "src/root/zod/zodFieldWrapper";

const az = {
  field: zodFieldWrapper,
  fieldNumber: (): ZodCoercedNumber<string | null> => {
    return z.coerce.number<string | null>();
  },
  versionNumber: (): ZodType<VersionNumber, unknown> => {
    return zodVersionNumber;
  },
  fieldDate: (): ZodCoercedDate<string | null> => {
    return z.coerce.date<string | null>();
  },
  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- 
    The typing here is already very clear and explicit as is.
    I don't feel there's any benefit to typing the return of the with method further as I feel it would become harder to read. 
  */
  with: <SchemaType extends ZodType>(schema: SchemaType) => {
    return {
      parse: <ErrorType extends Error = DataError>(
        input: unknown,
        error?: ErrorType | ((zodError: z.ZodError<unknown>) => void | ErrorType),
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- This wrapper needs the base implementation to work. The base parseZodSchema will be demoted to a non-exported internal function in v6.
      ): ReturnType<typeof parseZodSchema<SchemaType, ErrorType>> => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- This wrapper needs the base implementation to work. The base parseZodSchema will be demoted to a non-exported internal function in v6.
        return parseZodSchema<SchemaType, ErrorType>(schema, input, error);
      },
      parseAsync: async <ErrorType extends Error = DataError>(
        input: unknown,
        error?: ErrorType | ((zodError: z.ZodError<unknown>) => void | ErrorType),
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- This wrapper is expected to replace this implementation. The base parseZodSchemaAsync will be demoted to a non-exported internal function in v6.
      ): ReturnType<typeof parseZodSchemaAsync<SchemaType, ErrorType>> => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- This wrapper is expected to replace this implementation. The base parseZodSchemaAsync will be demoted to a non-exported internal function in v6.
        return await parseZodSchemaAsync<SchemaType, ErrorType>(schema, input, error);
      },
    };
  },
};

export default az;
