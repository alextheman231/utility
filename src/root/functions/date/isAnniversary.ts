import isLeapYear from "src/root/functions/date/isLeapYear";

function checkLeapYear(firstDate: Date, secondDate: Date): boolean {
  if (
    isLeapYear(firstDate.getFullYear()) &&
    firstDate.getMonth() === 1 &&
    secondDate.getMonth() === 1
  ) {
    return firstDate.getDate() === 29 && secondDate.getDate() === 28;
  }
  return false;
}

/**
 * Checks if the provided dates are exactly a whole number of years apart.
 *
 * @category Date
 *
 * @param firstDate - The first date to compare.
 * @param secondDate - The second date to compare.
 *
 * @returns True if the provided dates are exactly a whole number of years apart, and false otherwise.
 */
function isAnniversary(firstDate: Date, secondDate: Date): boolean {
  if (checkLeapYear(firstDate, secondDate) || checkLeapYear(secondDate, firstDate)) {
    return true;
  }
  return (
    firstDate.getDate() === secondDate.getDate() && firstDate.getMonth() === secondDate.getMonth()
  );
}

export default isAnniversary;
