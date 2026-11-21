import type { UserProjectConfigExport } from "vitest/config";

const vitestConfig: UserProjectConfigExport = {
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globalSetup: ["tests/setup.ts"],
    include: ["**/tests/**/*.test.ts"],
  },
};

export default vitestConfig;
