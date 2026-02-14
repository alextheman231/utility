import type { CreateEnumType } from "src/types";

import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";
import { describe, expect, test as testVitest } from "vitest";

import { writeFile } from "node:fs/promises";
import path from "node:path";

import getDependenciesFromGroup from "tests/end-to-end/helpers/getDependenciesFromGroup";
import getExpectedTgzName from "tests/end-to-end/helpers/getExpectedTgzName";
import getPackageJsonContents from "tests/end-to-end/helpers/getPackageJsonContents";
import getPackageJsonPath from "tests/end-to-end/helpers/getPackageJsonPath";

import { normaliseIndents, parseBoolean } from "src/functions";
import { DataError } from "src/types";

import utilityPackageInfo from "package.json" with { type: "json" };

const ModuleType = {
  COMMON_JS: "commonjs",
  ES_MODULES: "module",
  TYPESCRIPT: "typescript",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type ModuleType = CreateEnumType<typeof ModuleType>;

export const PackageManager = {
  NPM: "npm",
  PNPM: "pnpm",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PackageManager = CreateEnumType<typeof PackageManager>;

const test = parseBoolean(process.env.RUN_END_TO_END ?? "false") ? testVitest : testVitest.skip;

function getCodeString(moduleType: ModuleType): string {
  return normaliseIndents`
    ${
      moduleType === ModuleType.COMMON_JS
        ? 'const { sayHello } = require("@alextheman/utility");'
        : 'import { sayHello } from "@alextheman/utility";'
    }

    console.log(sayHello());
  `;
}

function packageJsonNotFoundError(packagePath: string) {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in temporary directory.",
  );
}

describe.each<PackageManager>(["npm", "pnpm"])("Entrypoints for %s", (packageManager) => {
  test.each<ModuleType>(["commonjs", "module", "typescript"])(
    "The package resolves correctly under module %s",
    async (moduleType) => {
      const code = getCodeString(moduleType);

      await temporaryDirectoryTask(async (temporaryPath) => {
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
        packageInfo.type =
          moduleType === ModuleType.TYPESCRIPT ? ModuleType.ES_MODULES : moduleType;

        await writeFile(
          path.join(temporaryPath, "package.json"),
          JSON.stringify(packageInfo, null, 2),
        );
        await runCommandInTempDirectory`${packageManager} install ${path.join(temporaryPath, tgzFileName)}`;

        const codeFileName = `sayHello.${moduleType === ModuleType.TYPESCRIPT ? "ts" : "js"}`;
        await writeFile(path.join(temporaryPath, codeFileName), code);

        function assert(exitCode: number | undefined, result: string) {
          expect(exitCode).toBe(0);
          expect(result.trim()).toContain("I'll commit to you");
        }

        if (moduleType === ModuleType.TYPESCRIPT) {
          const { tsx: tsxVersion } = getDependenciesFromGroup(
            utilityPackageInfo,
            "devDependencies",
          );
          await runCommandInTempDirectory`${packageManager} install --save-dev tsx@${tsxVersion}`;

          const packageInfo = await getPackageJsonContents(temporaryPath);

          if (packageInfo === null) {
            throw packageJsonNotFoundError(temporaryPath);
          }

          packageInfo.scripts = { ...(packageInfo.scripts ?? {}), execute: "tsx" };

          await writeFile(
            path.join(temporaryPath, "package.json"),
            JSON.stringify(packageInfo, null, 2),
          );

          const { exitCode, stdout: result } =
            await runCommandInTempDirectory`${packageManager} run execute -- ${codeFileName}`;
          assert(exitCode, result);
        } else {
          const { exitCode, stdout: result } =
            await runCommandInTempDirectory`${process.execPath} ${codeFileName}`;
          assert(exitCode, result);
        }
      });
    },
    30000,
  );
});
