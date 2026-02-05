import { DataError } from "src/types";

// eslint-disable-next-line jsdoc/require-jsdoc
function parseJsonFromStdout(stdout: string): Record<string, unknown> {
  const start = Math.min(
    ...["[", "{"]
      .map((character) => {
        return stdout.indexOf(character);
      })
      .filter((index) => {
        return index !== -1;
      }),
  );
  if (!Number.isFinite(start)) {
    throw new DataError({ stdout }, "NO_JSON_FOUND_IN_OUTPUT", "No JSON found in output");
  }
  return JSON.parse(stdout.slice(start));
}

export default parseJsonFromStdout;
