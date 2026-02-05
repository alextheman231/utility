import { readFile } from "node:fs/promises";
import path from "node:path";

// eslint-disable-next-line jsdoc/require-jsdoc
async function getPackageJsonContents(directory: string): Promise<Record<string, string> | null> {
  try {
    return JSON.parse(
      await readFile(
        path.resolve(
          ...(directory.endsWith("package.json") ? [directory] : [directory, "package.json"]),
        ),
        "utf-8",
      ),
    );
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export default getPackageJsonContents;
