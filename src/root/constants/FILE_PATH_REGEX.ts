export const FILE_PATH_PATTERN = String.raw`(?<directory>.+)[\/\\](?<base>[^\/\\]+)`;

const FILE_PATH_REGEX: RegExp = RegExp(`^${FILE_PATH_PATTERN}$`);
export default FILE_PATH_REGEX;
