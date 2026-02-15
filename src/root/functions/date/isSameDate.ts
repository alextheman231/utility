/**
 * Checks if the provided dates happen on the exact same day, month, and year.
 *
 * @category Date
 *
 * @param firstDate - The first date to compare.
 * @param secondDate - The second date to compare.
 *
 * @returns True if the provided dates occur on exactly the same day, month, and year, and returns false otherwise.
 */
function isSameDate(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getDate() === secondDate.getDate() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getFullYear() === secondDate.getFullYear()
  );
}

export default isSameDate;
