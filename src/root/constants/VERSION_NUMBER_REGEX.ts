export const VERSION_NUMBER_REGEX_PATTERN = String.raw`(?:v)?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)`;

const VERSION_NUMBER_REGEX: RegExp = RegExp(`^${VERSION_NUMBER_REGEX_PATTERN}$`);

export default VERSION_NUMBER_REGEX;
