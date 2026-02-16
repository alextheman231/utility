import path from "node:path";

function getPackageJsonPath(directory: string): string {
  return path.join(
    ...(directory.endsWith("package.json") ? [directory] : [directory, "package.json"]),
  );
}

export default getPackageJsonPath;
