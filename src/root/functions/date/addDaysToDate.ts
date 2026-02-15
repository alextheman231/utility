/**
 * Adds a given number of days to the provided date, returning the result as a new instance of Date.
 *
 * @category Date
 *
 * @param currentDate - The starting date (defaults to today).
 * @param dayIncrement - The amount of days you want to add (defaults to 1)
 *
 * @returns A new Date instance with the number of days added to the initially provided date.
 */
function addDaysToDate(currentDate: Date = new Date(), dayIncrement: number = 1): Date {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + dayIncrement);
  return newDate;
}

export default addDaysToDate;
