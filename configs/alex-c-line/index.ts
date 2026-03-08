import type { AlexCLineConfig } from "alex-c-line/configs";

import preCommitConfig from "configs/alex-c-line/preCommit";
import pullRequestTemplateConfig from "configs/alex-c-line/pullRequestTemplate";

import { scripts } from "package.json" with { type: "json" };

const alexCLineConfig: AlexCLineConfig<keyof typeof scripts> = {
  preCommit: preCommitConfig,
  template: {
    pullRequest: pullRequestTemplateConfig,
  },
};

export default alexCLineConfig;
