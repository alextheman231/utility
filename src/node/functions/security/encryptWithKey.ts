import sodium from "libsodium-wrappers";

import { DataError } from "src/root/types";

/**
 * Encrypt a secret given the public base64 key and the thing you want to encrypt.
 *
 * @param publicKey - The public base64 key to encrypt with.
 * @param plaintextValue - The value to encrypt in plaintext.
 *
 * @returns The encrypted string. This value will be different on repeat calls, but the result should always decrypt to the initial `plaintextValue` argument.
 */
async function encryptWithKey(publicKey: string, plaintextValue: string): Promise<string> {
  try {
    await sodium.ready;

    const base64Key = sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL);

    const encryptedValue = sodium.crypto_box_seal(plaintextValue, base64Key);

    const encryptedBase64Value = sodium.to_base64(encryptedValue, sodium.base64_variants.ORIGINAL);

    return encryptedBase64Value;
  } catch {
    throw new DataError(
      { publicKey },
      "ENCRYPTION_FAILED",
      "Encryption failed. Please double-check that the given key is a valid base 64 string.",
    );
  }
}

export default encryptWithKey;
