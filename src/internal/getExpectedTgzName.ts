import { execa } from "execa";
import z from "zod";

import { parseJsonFromStdout } from "src/internal";
import { az } from "src/root/zod";
import { DataError } from "src/v6";

async function getExpectedTgzName(packagePath: string, packageManager: string): Promise<string> {
  const { stdout: rawPackedTgzData } = await execa({
    cwd: packagePath,
  })`${packageManager} pack --json --dry-run`;
  const packedTgzData = parseJsonFromStdout(rawPackedTgzData);
  const parsedPackedTgzData = az
    .with(
      packageManager === "pnpm"
        ? z.object({ filename: z.string() })
        : z.array(z.object({ filename: z.string() })),
    )
    .parse(
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
