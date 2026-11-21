import type { OxlintConfig } from "oxlint";

const config: OxlintConfig = {
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["eslint", "typescript", "unicorn", "import", "node", "vitest"],
  rules: {
    "arrow-body-style": ["error", "always"],
    "capitalized-comments": "off",
    eqeqeq: "error",
    "func-style": ["error", "declaration"],
    "import/no-namespace": "error",
    "no-console": ["error", { allow: ["warn", "error", "info", "table"] }],
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    "no-lonely-if": "error",
    "no-magic-numbers": "off",
    "no-new": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["node_modules"],
            message: "Do not import directly from node_modules.",
          },
          {
            group: ["./", "../"],
            message:
              "Relative imports are not allowed. Please use imports relative to the project root instead.",
          },
        ],
      },
    ],
    "node/no-sync": "error",
    "typescript/adjacent-overload-signatures": "off",
    "typescript/array-type": ["error", { default: "generic" }],
    "typescript/ban-ts-comment": [
      "error",
      {
        "ts-check": "allow-with-description",
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
      },
    ],
    "typescript/ban-types": "error",
    "typescript/consistent-type-assertions": ["error", { assertionStyle: "as" }],
    "typescript/consistent-type-definitions": "off",
    "typescript/consistent-type-exports": "error",
    "typescript/consistent-type-imports": ["error", { fixStyle: "separate-type-imports" }],
    "typescript/dot-notation": "error",
    "typescript/no-deprecated": "warn",
    "typescript/no-require-imports": "error",
    "typescript/no-unnecessary-template-expression": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/prefer-function-type": "error",
    /* I would like to re-enable this at some point, however we do this in a lot of places and a lot of them are hard to avoid.
    As such, I will disable for now and see if we can avoid type assertions wherever we are currently doing them. */
    "typescript/no-unsafe-type-assertion": "off",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-process-exit": "error",
    "unicorn/no-typeof-undefined": "error",
    "typescript/restrict-template-expressions": [
      "error",
      {
        allow: [
          {
            from: "file",
            name: "VersionNumber",
          },
        ],
      },
    ],
    "typescript/no-unnecessary-type-parameters": "off",
    "vitest/consistent-each-for": [
      "error",
      {
        describe: "each",
        test: "each",
      },
    ],
    "vitest/consistent-test-it": ["error", { fn: "test" }],
    "vitest/consistent-vitest-vi": ["error", { fn: "vitest" }],
    "vitest/no-focused-tests": "error",
    "vitest/no-importing-vitest-globals": "off",
    "vitest/no-test-prefixes": "error",
    "vitest/prefer-importing-vitest-globals": "error",
    "vitest/no-import-node-test": "error",
    "vitest/prefer-describe-function-title": "off",
    "vitest/no-conditional-expect": "off",
    "import/no-named-as-default": "off",
    "vitest/expect-expect": "off",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-underscore-dangle": "off",
    "no-shadow": "off",
    "typescript/no-for-in-array": "off",
    "vitest/require-mock-type-parameters": "off",
  },
  overrides: [
    {
      files: ["**/deprecated/**"],
      rules: {
        "typescript/no-deprecated": "off",
      },
    },
  ],
};

export default config;
