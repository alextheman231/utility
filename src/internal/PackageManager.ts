import type { ObjectValue } from "src/root";

export const PackageManager = {
  NPM: "npm",
  PNPM: "pnpm",
} as const;

export type PackageManager = ObjectValue<typeof PackageManager>;
