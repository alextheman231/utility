import type { TypeDocOptions } from "typedoc";

const typeDocConfig: TypeDocOptions = {
  disableSources: true,
  entryPoints: ["./src/root/index.ts", "./src/node/index.ts"],
  excludeNotDocumented: true,
  includeVersion: true,
  outputs: [
    {
      name: "html",
      options: {
        navigation: {
          excludeReferences: false,
          includeCategories: true,
          includeFolders: true,
          includeGroups: true,
        },
      },
      path: "docs/features/html",
    },
  ],
  plugin: ["typedoc-rhineai-theme"],
};

export default typeDocConfig;
