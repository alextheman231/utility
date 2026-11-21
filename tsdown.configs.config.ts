import type { UserConfig } from "tsdown";

const config: UserConfig = {
  clean: true,
  deps: {
    neverBundle: ["typescript"],
  },
  dts: true,
  entry: ["configs/alex-c-line/index.ts", "configs/typedoc.ts"],
  fixedExtension: false,
  format: ["esm"],
  outDir: "dist-configs",
};

export default config;
