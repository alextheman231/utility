import { execa } from "execa";
import z from "zod";

import parseJsonFromStdout from "tests/end-to-end/helpers/parseJSONFromStdout";

import { parseZodSchema } from "src/root/functions";
import { DataError } from "src/root/types";

// eslint-disable-next-line jsdoc/require-jsdoc
async function getExpectedTgzName(packagePath: string, packageManager: string): Promise<string> {
  const { stdout: rawPackedTgzData } = await execa({
    cwd: packagePath,
  })`${packageManager} pack --json --dry-run`;
  const packedTgzData = parseJsonFromStdout(rawPackedTgzData);
  const parsedPackedTgzData = parseZodSchema(
    packageManager === "pnpm"
      ? z.object({ filename: z.string() })
      : z.array(z.object({ filename: z.string() })),
    packedTgzData,
    new DataError(
      packedTgzData,
      "AMBIGUOUS_EXPECTED_FILE_NAME",
      "Could not figure out the expected filename.",
    ),
  );

  const [normalisedTgzMetadata] = Array.isArray(parsedPackedTgzData)
    ? parsedPackedTgzData
    : [parsedPackedTgzData];
  const { filename: expectedTgzFileName } = normalisedTgzMetadata;

  return expectedTgzFileName;
}

export default getExpectedTgzName;
