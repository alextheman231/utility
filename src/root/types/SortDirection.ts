import type { ObjectValue } from "src/root/types/ObjectValue";

export const SortDirection = {
  DESC: "desc",
  ASC: "asc",
} as const;

export type SortDirection = ObjectValue<typeof SortDirection>;
