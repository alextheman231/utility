import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["internal/utility-base"],
  {
    rules: {
      "@typescript-eslint/no-deprecated": "off",
    },
  },
];
