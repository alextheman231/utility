/**
 * Creates a human-readable string describing the input date relative to the reference date.
 *
 * If no reference date is provided, the current local date and time is used as the reference.
 *
 * @category Temporal
 *
 * @param input - The date and time to format.
 * @param reference - The date and time to compare the input against.
 *
 * @returns A human-readable string describing the input date relative to the reference date.
 *
 * - If the date given is today, the output will be something like `Today at HH:MM`
 * - If the date given happened yesterday, the output will be something like `Yesterday at HH:MM`
 * - For any other date, the output will be something like `DD/MM/YYYY, HH:MM`
 */
function formatRelativeDateAndTime(
  input: Temporal.PlainDateTime | Temporal.ZonedDateTime,
  reference: Temporal.PlainDateTime | Temporal.ZonedDateTime = Temporal.Now.plainDateTimeISO(),
): string {
  const inputPlainDate = input.toPlainDate();
  const referencePlainDate = reference.toPlainDate();

  const formattedTime = input.toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" });

  if (inputPlainDate.equals(referencePlainDate.subtract({ days: 1 }))) {
    return `Yesterday at ${formattedTime}`;
  }

  if (inputPlainDate.equals(referencePlainDate)) {
    return `Today at ${formattedTime}`;
  }

  const formattedDate = input.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${formattedDate}, ${formattedTime}`;
}

export default formatRelativeDateAndTime;
