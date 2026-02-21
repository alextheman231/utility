import type { CreateEnumType } from "src/root";

export const ModuleType = {
  COMMON_JS: "commonjs",
  ES_MODULES: "module",
  TYPESCRIPT: "typescript",
} as const;

export type ModuleType = CreateEnumType<typeof ModuleType>;
