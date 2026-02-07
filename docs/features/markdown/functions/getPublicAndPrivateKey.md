[**@alextheman/utility v4.14.0**](../README.md)

***

[@alextheman/utility](../globals.md) / getPublicAndPrivateKey

# ~~Function: getPublicAndPrivateKey()~~

Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.

## Deprecated

Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.

This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2

## Param

The format of the resulting publicKey and privateKey you would like to use.

## Call Signature

> **getPublicAndPrivateKey**(): `PublicAndPrivateKey`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.

### Returns

`PublicAndPrivateKey`\<`Uint8Array`\<`ArrayBufferLike`\>\>

An object containing both the publicKey and privateKey, along with a keyType.

Because you have not provided an `outputFormat`, the keys will be typed as `Uint8Array`.

### Deprecated

Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.

This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2

## Call Signature

> **getPublicAndPrivateKey**(`outputFormat`): `PublicAndPrivateKey`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.

### Parameters

#### outputFormat

`"uint8array"`

The format of the resulting publicKey and privateKey you would like to use.

### Returns

`PublicAndPrivateKey`\<`Uint8Array`\<`ArrayBufferLike`\>\>

An object containing both the publicKey and privateKey, along with a keyType.

Because you provided an `outputFormat` of `uint8array`, the keys will be typed as `Uint8Array`.

### Deprecated

Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.

This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2

## Call Signature

> **getPublicAndPrivateKey**(`outputFormat`): `PublicAndPrivateKey`\<`string`\>

Returns the public key and private key, properly narrowing down types depending on the provided `outputFormat`.

### Parameters

#### outputFormat

The format of the resulting publicKey and privateKey you would like to use.

`"hex"` | `"base64"` | `"text"`

### Returns

`PublicAndPrivateKey`\<`string`\>

An object containing both the publicKey and privateKey, along with a keyType.

Because you provided an `outputFormat` of either `text`, `hex` or `base64`, the keys will be typed as `string`.

### Deprecated

Please use `sodium.crypto_box_keypair` from `libsodium-wrappers` instead.

This function was initially created to deal with a typing issue with the package introduced in v0.8.1 of said package, but this seems to have been fixed in v0.8.2
