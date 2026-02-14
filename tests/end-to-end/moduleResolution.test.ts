import type { CreateEnumType } from "src/types";

import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";
import tsConfig from "tsconfig.json" with { type: "json" };
import { describe, expect, test as testVitest } from "vitest";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import getDependenciesFromGroup from "tests/end-to-end/helpers/getDependenciesFromGroup";
import getExpectedTgzName from "tests/end-to-end/helpers/getExpectedTgzName";
import getPackageJsonContents from "tests/end-to-end/helpers/getPackageJsonContents";
import getPackageJsonPath from "tests/end-to-end/helpers/getPackageJsonPath";

import { normaliseIndents, omitProperties, parseBoolean } from "src/functions";
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

function getRuntimeCodeString(moduleType: ModuleType): string {
  return normaliseIndents`
    ${
      moduleType === ModuleType.COMMON_JS
        ? 'const { sayHello } = require("@alextheman/utility");'
        : 'import { sayHello } from "@alextheman/utility";'
    }

    console.log(sayHello());
  `;
}

function getTypeCodeString(expectedStatus: "error" | "success") {
  const typeArgument = {
    error: 123,
    success: '"hello"',
  }[expectedStatus];

  return normaliseIndents`
    import type { IsTypeArgumentString } from "@alextheman/utility";

    export type Test = IsTypeArgumentString<${typeArgument}>
  `;
}

function packageJsonNotFoundError(packagePath: string) {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in temporary directory.",
  );
}

function versionMismatchError(packageName: string, expectedVersion: string, actualVersion: string) {
  return new DataError({
    [packageName]: {
      actualVersion,
      expectedVersion,
    },
  });
}

describe.each<PackageManager>(["npm", "pnpm"])("Entrypoints for %s", (packageManager) => {
  test.each<ModuleType>(["commonjs", "module", "typescript"])(
    `The package resolves correctly under module %s and package manager ${packageManager}`,
    async (moduleType) => {
      const code = getRuntimeCodeString(moduleType);

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
        const codeFilePath = path.join(temporaryPath, "src", codeFileName);
        await mkdir(path.dirname(codeFilePath), { recursive: true });
        await writeFile(codeFilePath, code);

        function assert(exitCode: number | undefined, result: string) {
          expect(exitCode).toBe(0);
          expect(result.trim()).toContain("I'll commit to you");
        }

        if (moduleType === ModuleType.TYPESCRIPT) {
          const { tsx: tsxVersionUtility, typescript: typescriptVersionUtility } =
            getDependenciesFromGroup(utilityPackageInfo, "devDependencies");
          await runCommandInTempDirectory`${packageManager} install --save-dev tsx@${tsxVersionUtility} typescript@${typescriptVersionUtility}`;

          const testPackageInfo = await getPackageJsonContents(temporaryPath);

          if (testPackageInfo === null) {
            throw packageJsonNotFoundError(temporaryPath);
          }

          const { tsx: tsxVersionTest, typescript: typescriptVersionTest } =
            getDependenciesFromGroup(testPackageInfo, "devDependencies");

          if (tsxVersionTest !== tsxVersionUtility) {
            throw versionMismatchError("tsx", tsxVersionUtility, tsxVersionTest);
          } else if (typescriptVersionTest !== typescriptVersionUtility) {
            throw versionMismatchError(
              "typescript",
              typescriptVersionUtility,
              typescriptVersionTest,
            );
          }

          testPackageInfo.scripts = {
            ...(testPackageInfo.scripts ?? {}),
            execute: "tsx",
            lint: "tsc --noEmit",
          };
          await writeFile(
            path.join(temporaryPath, "package.json"),
            JSON.stringify(testPackageInfo, null, 2),
          );

          await writeFile(
            path.join(temporaryPath, "tsconfig.json"),
            JSON.stringify(
              {
                ...tsConfig,
                compilerOptions: omitProperties(tsConfig.compilerOptions ?? {}, "types"),
              },
              null,
              2,
            ),
          );

          const { exitCode: runtimeExitCode, stdout: result } =
            await runCommandInTempDirectory`${packageManager} run execute -- ${codeFilePath}`;
          assert(runtimeExitCode, result);

          await writeFile(codeFilePath, getTypeCodeString("success"));

          const { exitCode: typeSuccessExitCode } =
            await runCommandInTempDirectory`${packageManager} run lint`;
          expect(typeSuccessExitCode).toBe(0);

          await writeFile(codeFilePath, getTypeCodeString("error"));

          // Apparently tsc errors come through on stdout, for some reason?
          const { exitCode: typeErrorExitCode, stdout: errorMessage } =
            await runCommandInTempDirectory({ reject: false })`${packageManager} run lint`;
          expect(typeErrorExitCode).toBe(2);
          expect(errorMessage).toContain("TS2344");
        } else {
          const { exitCode, stdout: result } =
            await runCommandInTempDirectory`${process.execPath} ${codeFilePath}`;
          assert(exitCode, result);
        }
      });
    },
    30000,
  );
});
