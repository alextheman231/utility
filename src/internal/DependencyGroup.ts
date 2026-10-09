import type { ObjectValue } from "src/root";

export const DependencyGroup = {
  DEPENDENCIES: "dependencies",
  DEV_DEPENDENCIES: "devDependencies",
} as const;

export type DependencyGroup = ObjectValue<typeof DependencyGroup>;
