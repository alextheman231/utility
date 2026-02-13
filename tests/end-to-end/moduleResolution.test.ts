import type { CreateEnumType } from "src/types";

import { execa } from "execa";
import { temporaryDirectoryTask } from "tempy";
import { describe, expect, test as testVitest } from "vitest";

import { cp, writeFile } from "node:fs/promises";
import path from "node:path";

import getExpectedTgzName from "tests/end-to-end/helpers/getExpectedTgzName";
import getPackageJsonContents from "tests/end-to-end/helpers/getPackageJsonContents";

import { normaliseIndents, parseBoolean } from "src/functions";
import { DataError } from "src/types";

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

describe.each<PackageManager>([PackageManager.NPM, PackageManager.PNPM])(
  "Entrypoints for %s",
  async (packageManager) => {
    await execa({ cwd: process.cwd() })`${packageManager} pack`;
    const tgzFileName = await getExpectedTgzName(process.cwd(), packageManager);

    test.each<ModuleType>([ModuleType.COMMON_JS, ModuleType.ES_MODULES, ModuleType.TYPESCRIPT])(
      "The package resolves correctly under module %s",
      async (moduleType) => {
        const code = getCodeString(moduleType);

        await temporaryDirectoryTask(async (temporaryPath) => {
          const runCommandInTempDirectory = execa({ cwd: temporaryPath });
          await cp(path.join(process.cwd(), tgzFileName), path.join(temporaryPath, tgzFileName));

          if (packageManager === PackageManager.NPM) {
            await runCommandInTempDirectory`npm init -y`;
          } else {
            await runCommandInTempDirectory`pnpm init`;
          }
          const packageInfo = await getPackageJsonContents(temporaryPath);

          if (packageInfo === null) {
            throw new DataError(
              { packageInfo },
              "PACKAGE_JSON_NOT_FOUND",
              "Could not find package.json in temporary directory.",
            );
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
            await runCommandInTempDirectory`${packageManager} install --save-dev tsx`;
            const executable = { npm: "npx", pnpm: "pnpx" }[packageManager];
            const { exitCode, stdout: result } =
              await runCommandInTempDirectory`${executable} tsx ${codeFileName}`;
            assert(exitCode, result);
          } else {
            const { exitCode, stdout: result } =
              await runCommandInTempDirectory`node ${codeFileName}`;
            assert(exitCode, result);
          }
        });
      },
      30000,
    );
  },
);
