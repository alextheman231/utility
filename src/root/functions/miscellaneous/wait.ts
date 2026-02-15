/**
 * Waits for the given number of seconds
 *
 * @category Miscellaneous
 *
 * @param seconds - The number of seconds to wait.
 *
 * @returns A Promise that resolves after the given number of seconds.
 */
function wait(seconds: number): Promise<void> {
  return new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export default wait;
