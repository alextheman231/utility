import parseIntStrict from "src/root/functions/parsers/parseIntStrict";

/**
 * Checks if the provided year is a leap year.
 *
 * @category Date
 *
 * @param year - The year to check as a number.
 *
 * @throws {TypeError} If the year provided is not an integer.
 *
 * @returns True if the year is a leap year, and false otherwise.
 */
function isLeapYear(year: number): boolean {
  const parsedYear = parseIntStrict(`${year}`);
  return (parsedYear % 4 === 0 && parsedYear % 100 !== 0) || parsedYear % 400 === 0;
}

export default isLeapYear;
