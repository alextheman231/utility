import { defineConfig } from "tsdown";

export default defineConfig([
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
  {
    entry: ["configs/alex-c-line/index.ts"],
    outDir: ".alex-c-line/config",
    format: ["esm"],
    dts: true,
    clean: true,
    fixedExtension: false,
  },
]);
