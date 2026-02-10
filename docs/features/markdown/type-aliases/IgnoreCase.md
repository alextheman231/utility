[**@alextheman/utility v4.15.0**](../README.md)

***

[@alextheman/utility](../globals.md) / IgnoreCase

# Type Alias: IgnoreCase\<StringType\>

> **IgnoreCase**\<`StringType`\> = `string` *extends* `StringType` ? `string` : `StringType` *extends* `` `${infer FirstCharacter}${infer SecondCharacter}${infer Remainder}` `` ? \`$\{Uppercase\<FirstCharacter\> \| Lowercase\<FirstCharacter\>\}$\{Uppercase\<SecondCharacter\> \| Lowercase\<SecondCharacter\>\}$\{IgnoreCase\<Remainder\>\}\` : `StringType` *extends* `` `${infer FirstCharacter}${infer Remainder}` `` ? \`$\{Uppercase\<FirstCharacter\> \| Lowercase\<FirstCharacter\>\}$\{IgnoreCase\<Remainder\>\}\` : `""`

Allows case-insensitive variants of a known string type.

## Type Parameters

### StringType

`StringType` *extends* `string`

The input string type.
