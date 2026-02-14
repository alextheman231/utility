import path from "node:path";

// eslint-disable-next-line jsdoc/require-jsdoc
function getPackageJsonPath(directory: string): string {
  return path.join(
    ...(directory.endsWith("package.json") ? [directory] : [directory, "package.json"]),
  );
}

export default getPackageJsonPath;
