/**
 * Converts a given number of minutes into milliseconds.
 *
 * @param minutes - The amount of minutes.
 *
 * @returns The equivalent amount of milliseconds.
 */
function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000;
}

export default minutesToMs;
