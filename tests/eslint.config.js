import alexPlugin from "@alextheman/eslint-plugin";

export default [
  ...alexPlugin.configs["internal/utility-base"],
  ...alexPlugin.configs["combined/tests"],
];
