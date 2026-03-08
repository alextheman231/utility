import type { PreCommitConfig } from "alex-c-line/configs";

import { scripts } from "package.json" with { type: "json" };

const preCommitConfig: PreCommitConfig<keyof typeof scripts> = {
  packageManager: "pnpm",
  steps: [
    "build",
    "format",
    "lint",
    "test",
    async (stepRunner) => {
      const { exitCode } = await stepRunner({
        reject: false,
      })`git diff --cached --quiet tests/end-to-end tsdown.config.ts`;
      // If these files did not change, don't run end-to-end
      if (exitCode === 0) {
        return;
      }
      await stepRunner`pnpm run test-end-to-end`;
    },
  ],
};

export default preCommitConfig;
