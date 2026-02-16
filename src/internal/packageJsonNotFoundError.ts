import getPackageJsonPath from "src/internal/getPackageJsonPath";
import { DataError } from "src/root";

function packageJsonNotFoundError(packagePath: string): DataError {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in directory.",
  );
}

export default packageJsonNotFoundError;
