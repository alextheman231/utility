import type { NullableOnCondition } from "src/root";

import { readFile } from "node:fs/promises";

import getPackageJsonPath from "src/internal/getPackageJsonPath";
import packageJsonNotFoundError from "src/internal/packageJsonNotFoundError";

export interface GetPackageJsonContentsOptions<Strict extends boolean = true> {
  strict?: Strict;
}

async function getPackageJsonContents<Strict extends boolean = true>(
  directory: string,
  options?: GetPackageJsonContentsOptions<Strict>,
): Promise<NullableOnCondition<Strict, Record<string, any>>> {
  const { strict = true } = options ?? {};
  try {
    return JSON.parse(await readFile(getPackageJsonPath(directory), "utf-8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      if (strict) {
        throw packageJsonNotFoundError(directory);
      } else {
        return null as NullableOnCondition<Strict, Record<string, any>>;
      }
    }
    throw error;
  }
}

export default getPackageJsonContents;
