import type { DependencyGroup } from "src/internal/DependencyGroup";

import z from "zod";

import { az } from "src/root/zod";

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
    dependencies: az.with(z.record(z.string(), z.string())).parse(packageInfo.dependencies ?? {}),
    devDependencies: az
      .with(z.record(z.string(), z.string()))
      .parse(packageInfo.devDependencies ?? {}),
  }[dependencyGroup];
}

export default getDependenciesFromGroup;
