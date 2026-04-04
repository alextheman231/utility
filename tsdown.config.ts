import type { UserConfig } from "tsdown";

const config: Array<UserConfig> = [
  {
    entry: ["src/root/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    fixedExtension: false,
  },
  {
    entry: ["src/node/index.ts"],
    outDir: "dist/node",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    fixedExtension: false,
  },
  {
    entry: ["src/internal/index.ts"],
    outDir: "dist/internal",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    fixedExtension: false,
  },
];

export default config;
