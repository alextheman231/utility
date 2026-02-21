import type { CreateEnumType } from "src/root";

export const PackageManager = {
  NPM: "npm",
  PNPM: "pnpm",
} as const;

export type PackageManager = CreateEnumType<typeof PackageManager>;
