// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck: This is a deprecated function.
import sodium from "libsodium-wrappers";

import { DataError } from "src/root/types";

export interface PublicAndPrivateKey<KeyType extends Uint8Array | string> {
  /** The generated public key from libsodium */
  publicKey: KeyType;
  /** The generated private key from libsodium */
  privateKey: KeyType;
  /** The key type from libsodium */
  keyType: ReturnType<typeof sodium.crypto_box_keypair>["keyType"];
}

/**
 * Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.
 *
 * @deprecated Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.
 *
 * This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2
 *
 * @returns An object containing both the publicKey and privateKey, along with a keyType.
 *
 * Because you have not provided an `outputFormat`, the keys will be typed as `Uint8Array`.
 */
function getPublicAndPrivateKey(): PublicAndPrivateKey<Uint8Array>;
/**
 * Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.
 *
 * @deprecated Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.
 *
 * This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2
 *
 * @param outputFormat - The format of the resulting publicKey and privateKey you would like to use.
 *
 * @returns An object containing both the publicKey and privateKey, along with a keyType.
 *
 * Because you provided an `outputFormat` of `uint8array`, the keys will be typed as `Uint8Array`.
 */
function getPublicAndPrivateKey(outputFormat: "uint8array"): PublicAndPrivateKey<Uint8Array>;
/**
 * Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.
 *
 * @deprecated Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.
 *
 * This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2
 *
 * @param outputFormat - The format of the resulting publicKey and privateKey you would like to use.
 *
 * @returns An object containing both the publicKey and privateKey, along with a keyType.
 *
 * Because you provided an `outputFormat` of either `text`, `hex` or `base64`, the keys will be typed as `string`.
 */
function getPublicAndPrivateKey(
  outputFormat: "text" | "hex" | "base64",
): PublicAndPrivateKey<string>;
/**
 * Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.
 *
 * @deprecated Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.
 *
 * This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2
 *
 * @param outputFormat - The format of the resulting publicKey and privateKey you would like to use.
 *
 * @returns An object containing both the publicKey and privateKey, along with a keyType.
 */
function getPublicAndPrivateKey(
  outputFormat?: Parameters<typeof sodium.crypto_box_keypair>[0],
): PublicAndPrivateKey<Uint8Array | string> {
  const keys = sodium.crypto_box_keypair(outputFormat);

  if (outputFormat === "uint8array" || outputFormat === undefined) {
    if (!(keys?.publicKey instanceof Uint8Array && keys?.privateKey instanceof Uint8Array)) {
      throw new DataError(
        {
          publicKey: `<redacted: ${keys?.publicKey?.constructor?.name ?? typeof keys?.publicKey}>`,
          privateKey: `<redacted: ${keys?.privateKey?.constructor?.name ?? typeof keys?.privateKey}>`,
        },
        "INVALID_KEY_TYPES",
        "Expected Uint8Array keypair from libsodium.",
      );
    }
    return keys;
  }

  return keys as PublicAndPrivateKey<string>;
}

export default getPublicAndPrivateKey;
