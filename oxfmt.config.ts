import type { OxfmtConfig } from "oxfmt";

const config: OxfmtConfig = {
  ignorePatterns: ["dist/**", "pnpm-lock.yaml"],
  sortImports: {
    customGroups: [
      {
        elementNamePattern: ["**/*.json"],
        groupName: "json",
      },
      {
        elementNamePattern: ["tests/**"],
        groupName: "type-tests",
        selector: "type",
      },
      {
        elementNamePattern: ["tests/**"],
        groupName: "value-tests",
      },
    ],
    groups: [
      "type-builtin",
      "type-external",
      "type-tests",
      "type-internal",
      "value-external",
      "value-builtin",
      "value-tests",
      "value-internal",
      "json",
    ],
    ignoreCase: true,
    internalPattern: ["src/"],
    newlinesBetween: true,
    order: "asc",
    partitionByComment: false,
    partitionByNewLine: false,
    specialCharacters: "keep",
    type: "alphabetical",
  },
};

export default config;
