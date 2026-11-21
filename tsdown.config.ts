import type { UserConfig } from "tsdown";

const config: Array<UserConfig> = [
  {
    clean: true,
    dts: true,
    entry: ["src/root/index.ts"],
    fixedExtension: false,
    format: ["esm", "cjs"],
  },
  {
    clean: true,
    dts: true,
    entry: ["src/node/index.ts"],
    fixedExtension: false,
    format: ["esm", "cjs"],
    outDir: "dist/node",
  },
  {
    clean: true,
    dts: true,
    entry: ["src/internal/index.ts"],
    fixedExtension: false,
    format: ["esm", "cjs"],
    outDir: "dist/internal",
  },
  {
    clean: true,
    dts: true,
    entry: ["src/v6/index.ts"],
    fixedExtension: false,
    format: ["esm", "cjs"],
    outDir: "dist/v6",
  },
  {
    clean: true,
    dts: true,
    entry: ["src/temporal/index.ts"],
    fixedExtension: false,
    format: ["esm", "cjs"],
    outDir: "dist/temporal",
  },
];

export default config;
