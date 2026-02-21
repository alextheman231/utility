import sodium from "libsodium-wrappers";
import { beforeAll, describe, expect, test } from "vitest";

import encryptWithKey from "src/root/functions/security/encryptWithKey";
import { DataError } from "src/root/types";

function assertNoPlaintextLeak(value: unknown, plaintext: string, seen = new Set<unknown>()) {
  if (value === null || value === undefined) {
    return;
  }

  if (typeof value === "string") {
    expect(value).not.toContain(plaintext);
    return;
  }

  if (typeof value === "object") {
    if (seen.has(value)) {
      return;
    }
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) {
        assertNoPlaintextLeak(item, plaintext, seen);
      }
      return;
    }

    for (const [key, objectValue] of Object.entries(value as Record<string, unknown>)) {
      expect(key).not.toContain(plaintext);
      assertNoPlaintextLeak(objectValue, plaintext, seen);
    }
    return;
  }

  expect(String(value)).not.toContain(plaintext);
}

describe("encryptWithKey", () => {
  beforeAll(async () => {
    await sodium.ready;
  });

  test("Encrypts the value and responds with the encrypted value, NOT the plaintext", async () => {
    const { publicKey, privateKey } = sodium.crypto_box_keypair("uint8array");

    const publicKeyBase64 = sodium.to_base64(publicKey, sodium.base64_variants.ORIGINAL);
    const plaintextValue = "Hello world";

    const encryptedValue = await encryptWithKey(publicKeyBase64, plaintextValue);

    const decryptedValue = sodium.crypto_box_seal_open(
      sodium.from_base64(encryptedValue, sodium.base64_variants.ORIGINAL),
      publicKey,
      privateKey as Uint8Array,
      "text",
    );

    expect(decryptedValue).toBe(plaintextValue);
    expect(encryptedValue).not.toBe(plaintextValue);
  });

  test("Returns different encrypted strings per run that still resolve to the same value", async () => {
    const { publicKey, privateKey } = sodium.crypto_box_keypair("uint8array");

    const publicKeyBase64 = sodium.to_base64(publicKey, sodium.base64_variants.ORIGINAL);
    const plaintextValue = "Hello world";

    const firstEncryptedValue = await encryptWithKey(publicKeyBase64, plaintextValue);
    expect(firstEncryptedValue).not.toBe(plaintextValue);

    const secondEncryptedValue = await encryptWithKey(publicKeyBase64, plaintextValue);
    expect(secondEncryptedValue).not.toBe(plaintextValue);

    expect(firstEncryptedValue).not.toBe(secondEncryptedValue);

    const firstDecryptedValue = sodium.crypto_box_seal_open(
      sodium.from_base64(firstEncryptedValue, sodium.base64_variants.ORIGINAL),
      publicKey,
      privateKey,
      "text",
    );
    const secondDecryptedValue = sodium.crypto_box_seal_open(
      sodium.from_base64(secondEncryptedValue, sodium.base64_variants.ORIGINAL),
      publicKey,
      privateKey,
      "text",
    );

    expect(firstDecryptedValue).toBe(plaintextValue);
    expect(secondDecryptedValue).toBe(plaintextValue);
  });

  test("If any of this errors, the error message MUST NOT display the plaintext value", async () => {
    const plaintextValue = "gdfssdehrhrt";
    const error = await DataError.expectErrorAsync(async () => {
      await encryptWithKey("Invalid public key", plaintextValue);
    });
    assertNoPlaintextLeak(error, plaintextValue);
    expect(error.message).toBe(
      "Encryption failed. Please double-check that the given key is a valid base 64 string.",
    );
  });
});
