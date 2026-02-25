[**@alextheman/utility v5.4.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / encryptWithKey

# Function: encryptWithKey()

> **encryptWithKey**(`publicKey`, `plaintextValue`): `Promise`\<`string`\>

Encrypt a secret given the public base64 key and the thing you want to encrypt.

## Parameters

### publicKey

`string`

The public base64 key to encrypt with.

### plaintextValue

`string`

The value to encrypt in plaintext.

## Returns

`Promise`\<`string`\>

The encrypted string. This value will be different on repeat calls, but the result should always decrypt to the initial `plaintextValue` argument.
