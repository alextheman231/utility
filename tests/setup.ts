import { execa } from "execa";

// eslint-disable-next-line jsdoc/require-jsdoc
export async function setup(): Promise<void> {
  await execa`pnpm run build`;
}
