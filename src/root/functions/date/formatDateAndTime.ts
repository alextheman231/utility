import addDaysToDate from "src/root/functions/date/addDaysToDate";
import isSameDate from "src/root/functions/date/isSameDate";

/**
 * Creates a human-readable string with information about the input date.
 *
 * @category Date
 *
 * @param inputDate - The date to base the string on.
 *
 * @returns A new string with information about the given date.
 *
 * - If the date given is today, the output will be something like `Today at HH:MM`
 * - If the date given happened yesterday, the output will be something like `Yesterday at HH:MM`
 * - For any other date, the output will be something like `DD/MM/YYYY, HH:MM`
 */
function formatDateAndTime(inputDate: Date): string {
  const yesterday = addDaysToDate(new Date(), -1);
  const today = new Date();
  const inputTime = `${inputDate.getHours().toString().padStart(2, "0")}:${inputDate.getMinutes().toString().padStart(2, "0")}`;

  if (isSameDate(inputDate, yesterday)) {
    return `Yesterday at ${inputTime}`;
  }
  if (isSameDate(inputDate, today)) {
    return `Today at ${inputTime}`;
  }

  const formattedInputDay = inputDate.getDate().toString().padStart(2, "0");
  // inputDate.getMonth() + 1... Whoever decided the Date object should be like this, I just want to have a word with you...
  const formattedInputMonth = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const formattedInputYear = inputDate.getFullYear().toString();
  return `${formattedInputDay}/${formattedInputMonth}/${formattedInputYear}, ${inputTime}`;
}

export default formatDateAndTime;
