import { execa } from "execa";

// eslint-disable-next-line jsdoc/require-jsdoc -- This is a test function and is not exported from any public entrypoints.
export async function setup(): Promise<void> {
  await execa`pnpm run build`;
}
