import type { CreateEnumType } from "src/root";

export const PackageManager = {
  NPM: "npm",
  PNPM: "pnpm",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PackageManager = CreateEnumType<typeof PackageManager>;
