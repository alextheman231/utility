import type { DependencyGroup } from "src/internal/DependencyGroup";

import z from "zod";

import { parseZodSchema } from "src/root/functions";

/**
 * Get the dependencies from a given dependency group in `package.json`.
 *
 * @category Miscellaneous
 *
 * @param packageInfo - The data coming from `package.json`.
 * @param dependencyGroup - The group to get dependency information about (can be `dependencies` or `devDependencies`).
 *
 * @returns A record consisting of the package names and version ranges from the given dependency group.
 */
function getDependenciesFromGroup(
  packageInfo: Record<string, unknown>,
  dependencyGroup: DependencyGroup,
): Record<string, string> {
  return {
    dependencies: parseZodSchema(z.record(z.string(), z.string()), packageInfo.dependencies ?? {}),
    devDependencies: parseZodSchema(
      z.record(z.string(), z.string()),
      packageInfo.devDependencies ?? {},
    ),
  }[dependencyGroup];
}

export default getDependenciesFromGroup;
