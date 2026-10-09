import type { ObjectValue } from "src/root";

export const ModuleType = {
  COMMON_JS: "commonjs",
  ES_MODULES: "module",
  TYPESCRIPT: "typescript",
} as const;

export type ModuleType = ObjectValue<typeof ModuleType>;
