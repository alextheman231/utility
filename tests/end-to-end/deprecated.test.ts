import { temporaryDirectoryTask } from "tempy";
import { describe as describeVitest, expect, test } from "vitest";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  getDependenciesFromGroup,
  getPackageJsonContents,
  setupPackageEndToEnd,
} from "src/internal";
import { normaliseIndents, omitProperties, parseBoolean } from "src/root";

import utilityPackageInfo from "package.json" with { type: "json" };
import tsConfig from "tsconfig.json" with { type: "json" };

const describe = parseBoolean(process.env.RUN_END_TO_END ?? "false")
  ? describeVitest
  : describeVitest.skip;

describe("Deprecated folder", () => {
  test("Can import from the deprecated folder, but it marks as deprecated", async () => {
    await temporaryDirectoryTask(async (temporaryPath) => {
      const {
        typescript: typescriptVersionUtility,
        eslint: eslintVersionUtility,
        "typescript-eslint": tseslintVersionUtility,
      } = getDependenciesFromGroup(utilityPackageInfo, "devDependencies");
      const runCommandInTempDirectory = await setupPackageEndToEnd(
        temporaryPath,
        "pnpm",
        "typescript",
      );

      await runCommandInTempDirectory`pnpm install --save-dev typescript@${typescriptVersionUtility} eslint@${eslintVersionUtility} typescript-eslint@${tseslintVersionUtility}`;

      const sourceFolder = path.join(temporaryPath, "src");
      await mkdir(sourceFolder);
      const codeFilePath = path.join(sourceFolder, "RecordKey.ts");
      await writeFile(
        codeFilePath,
        normaliseIndents`
                import type { RecordKey } from "@alextheman/utility";

                const testRecord: Record<RecordKey, string> = { hello: "world" };
                console.log(testRecord);
            `,
      );

      const testPackageInfo = await getPackageJsonContents(temporaryPath);
      testPackageInfo.scripts = {
        ...(testPackageInfo.scripts ?? {}),
        "lint-tsc": "tsc --noEmit",
        "lint-eslint": "eslint src/RecordKey.ts",
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

      await runCommandInTempDirectory`pnpm install`;
      const { exitCode: typeExitCode } = await runCommandInTempDirectory`pnpm run lint-tsc`;
      expect(typeExitCode).toBe(0);

      await writeFile(
        path.join(temporaryPath, "eslint.config.js"),
        normaliseIndents`
                import tseslint from "typescript-eslint";

                export default [
                    {
                        files: ["**/*.ts"],
                        plugins: {
                            "@typescript-eslint": tseslint.plugin
                        },
                        languageOptions: {
                            parser: tseslint.parser,
                            parserOptions: {
                                ecmaVersion: "latest",
                                projectService: true,
                                sourceType: "module",
                                tsconfigRootDir: process.cwd(),
                            },
                        },
                        rules: {
                            "@typescript-eslint/no-deprecated": "error"
                        }
                    }
                ]
            `,
      );

      const { exitCode: eslintExitCode, stdout: errorMessage } = await runCommandInTempDirectory({
        reject: false,
      })`pnpm run lint-eslint`;
      expect(eslintExitCode).toBe(1);
      expect(errorMessage).toContain("@typescript-eslint/no-deprecated");
    });
  }, 30000);
});
