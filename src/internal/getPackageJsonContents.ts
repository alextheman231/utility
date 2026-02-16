import { readFile } from "node:fs/promises";

import getPackageJsonPath from "src/internal/getPackageJsonPath";

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
