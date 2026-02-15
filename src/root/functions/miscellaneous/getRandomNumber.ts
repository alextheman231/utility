import parseIntStrict from "src/root/functions/parsers/parseIntStrict";

/**
 * Gets a random number between the given bounds.
 *
 * @category Miscellaneous
 *
 * @param lowerBound - The lowest number that can be chosen.
 * @param upperBound - The highest number that can be chosen.
 *
 * @returns A random number between the provided lower bound and upper bound.
 */
function getRandomNumber(lowerBound: number, upperBound: number): number {
  const parsedLowerBound = parseIntStrict(`${lowerBound}`);
  const parsedUpperBound = parseIntStrict(`${upperBound}`);
  return Math.floor(Math.random() * (parsedUpperBound - parsedLowerBound + 1) + parsedLowerBound);
}

export default getRandomNumber;
