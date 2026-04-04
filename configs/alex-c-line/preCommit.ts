import type { PreCommitConfig } from "alex-c-line/configs";

import { scripts } from "package.json" with { type: "json" };

const preCommitConfig: PreCommitConfig<keyof typeof scripts> = {
  packageManager: "pnpm",
  steps: ["build", "format", "lint", "test"],
};

export default preCommitConfig;
