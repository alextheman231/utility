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
]);
