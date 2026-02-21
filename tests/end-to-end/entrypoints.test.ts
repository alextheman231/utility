import type { PackageManager } from "src/internal";
import type { CreateEnumType } from "src/root/types";

import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";
import tsConfig from "tsconfig.json" with { type: "json" };
import { beforeAll, describe, expect, test as testVitest } from "vitest";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  getDependenciesFromGroup,
  getPackageJsonContents,
  ModuleType,
  packageJsonNotFoundError,
  setupPackageEndToEnd,
} from "src/internal";
import { normaliseIndents, omitProperties, parseBoolean } from "src/root/functions";
import { DataError } from "src/root/types";

import utilityPackageInfo from "package.json" with { type: "json" };

const Entrypoint = {
  ROOT: "@alextheman/utility",
  NODE: "@alextheman/utility/node",
  INTERNAL: "@alextheman/utility/internal",
} as const;

type Entrypoint = CreateEnumType<typeof Entrypoint>;

const test = parseBoolean(process.env.RUN_END_TO_END ?? "false") ? testVitest : testVitest.skip;

function getRuntimeCodeString(moduleType: ModuleType, entrypoint: Entrypoint): string {
  return normaliseIndents`
    ${
      moduleType === ModuleType.COMMON_JS
        ? `const { sayHello } = require("${entrypoint}");`
        : `import { sayHello } from "${entrypoint}";`
    }

    console.log(sayHello());
  `;
}

function getTypeCodeString(expectedStatus: "error" | "success", entrypoint: Entrypoint) {
  const typeArgument = {
    error: 123,
    success: '"hello"',
  }[expectedStatus];

  return normaliseIndents`
    import type { IsTypeArgumentString } from "${entrypoint}";

    export type Test = IsTypeArgumentString<${typeArgument}>
  `;
}

function versionMismatchError(packageName: string, expectedVersion: string, actualVersion: string) {
  return new DataError({
    [packageName]: {
      actualVersion,
      expectedVersion,
    },
  });
}

function assert(exitCode: number | undefined, result: string) {
  expect(exitCode).toBe(0);
  expect(result.trim()).toContain("I'll commit to you");
}

beforeAll(async () => {
  await execa`pnpm run build`;
});

describe.each<Entrypoint>([Entrypoint.ROOT, Entrypoint.NODE, Entrypoint.INTERNAL])(
  "Entrypoint %s",
  (entrypoint) => {
    describe.each<PackageManager>(["npm", "pnpm"])("Package manager %s", (packageManager) => {
      test.each<ModuleType>(["commonjs", "module", "typescript"])(
        "Module type %s",
        async (moduleType) => {
          const code = getRuntimeCodeString(moduleType, entrypoint);

          await temporaryDirectoryTask(async (temporaryPath) => {
            const runCommandInTempDirectory = await setupPackageEndToEnd(
              temporaryPath,
              packageManager,
              moduleType,
            );

            const codeFileName = `sayHello.${moduleType === ModuleType.TYPESCRIPT ? "ts" : "js"}`;
            const codeFilePath = path.join(temporaryPath, "src", codeFileName);
            await mkdir(path.dirname(codeFilePath), { recursive: true });
            await writeFile(codeFilePath, code);

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

              await writeFile(codeFilePath, getTypeCodeString("success", entrypoint));

              const { exitCode: typeSuccessExitCode } =
                await runCommandInTempDirectory`${packageManager} run lint`;
              expect(typeSuccessExitCode).toBe(0);

              await writeFile(codeFilePath, getTypeCodeString("error", entrypoint));

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
  },
);
