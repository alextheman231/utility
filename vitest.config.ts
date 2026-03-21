import type { UserProjectConfigExport } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const vitestConfig: UserProjectConfigExport = {
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    include: ["**/tests/**/*.test.ts"],
    globalSetup: ["tests/setup.ts"],
  },
};

export default vitestConfig;
