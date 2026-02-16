import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["internal/utility"],
  {
    rules: {
      "jsdoc/require-jsdoc": "off",
    },
  },
];
