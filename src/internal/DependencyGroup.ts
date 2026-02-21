import type { CreateEnumType } from "src/root";

export const DependencyGroup = {
  DEPENDENCIES: "dependencies",
  DEV_DEPENDENCIES: "devDependencies",
} as const;

export type DependencyGroup = CreateEnumType<typeof DependencyGroup>;
