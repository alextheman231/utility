/**
 * Calculates the monthly difference between two given dates, subtracting the first from
 * the second and gives a negative result if the first date occurs earlier than the second.
 *
 * @param firstDate - The first date
 * @param secondDate - The second date
 *
 * @returns The calculated difference as a number
 */
function calculateMonthlyDifference(firstDate: Date, secondDate: Date): number {
  return firstDate.getMonth() - secondDate.getMonth();
}

export default calculateMonthlyDifference;
