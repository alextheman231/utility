import isLeapYear from "src/root/functions/date/isLeapYear";

function endOfMonthChecksButNotFebruary(firstDate: Date, secondDate: Date): boolean {
  if ([3, 5, 8, 10].includes(firstDate.getMonth())) {
    return firstDate.getDate() === 30 && secondDate.getDate() === 31;
  }
  return false;
}

function nonLeapYearFebruaryChecks(firstDate: Date, secondDate: Date): boolean {
  if (firstDate.getMonth() === 1) {
    if (!isLeapYear(firstDate.getFullYear()) && firstDate.getDate() === 28) {
      return [28, 29, 30, 31].includes(secondDate.getDate());
    }
  }
  return false;
}

function leapYearFebruaryChecks(firstDate: Date, secondDate: Date): boolean {
  if (firstDate.getMonth() === 1) {
    if (isLeapYear(firstDate.getFullYear()) && firstDate.getDate() === 29) {
      return [29, 30, 31].includes(secondDate.getDate());
    }
  }
  return false;
}

/**
 * Checks if the provided dates are exactly a whole number of months apart.
 *
 * @category Date
 *
 * @param firstDate - The first date to compare.
 * @param secondDate - The second date to compare.
 *
 * @returns True if the provided dates are exactly a whole number of months apart, and false otherwise.
 */
function isMonthlyMultiple(firstDate: Date, secondDate: Date): boolean {
  if (
    endOfMonthChecksButNotFebruary(firstDate, secondDate) ||
    endOfMonthChecksButNotFebruary(secondDate, firstDate)
  ) {
    return true;
  }

  if (
    nonLeapYearFebruaryChecks(firstDate, secondDate) ||
    nonLeapYearFebruaryChecks(secondDate, firstDate)
  ) {
    return true;
  }

  if (
    leapYearFebruaryChecks(firstDate, secondDate) ||
    leapYearFebruaryChecks(secondDate, firstDate)
  ) {
    return true;
  }

  return firstDate.getDate() === secondDate.getDate();
}

export default isMonthlyMultiple;
