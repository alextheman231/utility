import getPackageJsonPath from "src/internal/getPackageJsonPath";
import { DataError } from "src/v6";

export interface PackageJsonNotFoundErrorPayload {
  packagePath: string;
}

function packageJsonNotFoundError(
  packagePath: string,
): DataError<PackageJsonNotFoundErrorPayload, "PACKAGE_JSON_NOT_FOUND"> {
  return new DataError(
    { packagePath: getPackageJsonPath(packagePath) },
    "PACKAGE_JSON_NOT_FOUND",
    "Could not find package.json in directory.",
  );
}

export default packageJsonNotFoundError;
