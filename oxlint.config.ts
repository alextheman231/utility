import { oxlintConfigBase } from "@alextheman/configs/oxlint";

export default oxlintConfigBase({
  denyRelativeImportsInFiles: "{src,tests,configs}/**/*.{ts,tsx}",
});
