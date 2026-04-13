import type { UserProjectConfigExport } from "vitest/config";

const vitestConfig: UserProjectConfigExport = {
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    include: ["**/tests/**/*.test.ts"],
    globalSetup: ["tests/setup.ts"],
  },
};

export default vitestConfig;
