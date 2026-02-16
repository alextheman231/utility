import type { CreateEnumType } from "src/root";

export const ModuleType = {
  COMMON_JS: "commonjs",
  ES_MODULES: "module",
  TYPESCRIPT: "typescript",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ModuleType = CreateEnumType<typeof ModuleType>;
