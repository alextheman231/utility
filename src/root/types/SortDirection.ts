import type { CreateEnumType } from "src/root/types/CreateEnumType";

export const SortDirection = {
  DESC: "desc",
  ASC: "asc",
} as const;

export type SortDirection = CreateEnumType<typeof SortDirection>;
