import type { ZodCoercedDate, ZodCoercedNumber, ZodType } from "zod";

import type { VersionNumber } from "src/root/types";

import z from "zod";

import { zodVersionNumber } from "src/root/types";
import parseZodSchema from "src/root/zod/parseZodSchema";
import parseZodSchemaAsync from "src/root/zod/parseZodSchemaAsync";
import zodFieldWrapper from "src/root/zod/zodFieldWrapper";

const az = {
  parse: parseZodSchema,
  parseAsync: parseZodSchemaAsync,
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
};

export default az;
