import { readFile } from "node:fs/promises";

import getPackageJsonPath from "tests/end-to-end/helpers/getPackageJsonPath";

// eslint-disable-next-line jsdoc/require-jsdoc
async function getPackageJsonContents(directory: string): Promise<Record<string, any> | null> {
  try {
    return JSON.parse(await readFile(getPackageJsonPath(directory), "utf-8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export default getPackageJsonContents;
