import { execa } from "execa";

export async function setup(): Promise<void> {
  await execa`pnpm run build`;
}
