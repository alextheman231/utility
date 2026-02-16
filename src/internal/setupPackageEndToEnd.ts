import type { ExecaMethod } from "execa";

import type { DependencyGroup } from "src/internal";

import { execa } from "execa";

import { writeFile } from "node:fs/promises";
import path from "node:path";

import { getExpectedTgzName, packageJsonNotFoundError } from "src/internal";
import getPackageJsonContents from "src/internal/getPackageJsonContents";
import { ModuleType } from "src/internal/ModuleType";
import { PackageManager } from "src/internal/PackageManager";

export interface SetupPackageEndToEndOptions {
  dependencyGroup?: DependencyGroup;
}

async function setupPackageEndToEnd(
  temporaryPath: string,
  packageManager: PackageManager,
  moduleType: ModuleType,
  options?: SetupPackageEndToEndOptions,
): Promise<ExecaMethod<{ cwd: string }>> {
  const { dependencyGroup = "dependencies" } = options ?? {};

  await execa({
    cwd: process.cwd(),
  })`${packageManager} pack --pack-destination ${temporaryPath}`;
  const tgzFileName = await getExpectedTgzName(process.cwd(), packageManager);
  const runCommandInTempDirectory = execa({ cwd: temporaryPath });

  if (packageManager === PackageManager.NPM) {
    await runCommandInTempDirectory`npm init -y`;
  } else {
    await runCommandInTempDirectory`pnpm init`;
  }
  const packageInfo = await getPackageJsonContents(temporaryPath);

  if (packageInfo === null) {
    throw packageJsonNotFoundError(temporaryPath);
  }
  packageInfo.type = moduleType === ModuleType.TYPESCRIPT ? ModuleType.ES_MODULES : moduleType;

  await writeFile(path.join(temporaryPath, "package.json"), JSON.stringify(packageInfo, null, 2));
  await runCommandInTempDirectory`${packageManager} install ${dependencyGroup === "devDependencies" ? "--save-dev" : "--save-prod"} ${path.join(temporaryPath, tgzFileName)}`;

  return runCommandInTempDirectory;
}

export default setupPackageEndToEnd;
