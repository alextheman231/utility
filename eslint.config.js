import plugin from "@alextheman/eslint-plugin";

export default [...plugin.configs["internal/utility"], ...plugin.configs["general/package-json"]];
