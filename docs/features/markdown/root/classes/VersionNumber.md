[**@alextheman/utility v5.0.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / VersionNumber

# Class: VersionNumber

Represents a software version number, considered to be made up of a major, minor, and patch part.

## Constructors

### Constructor

> **new VersionNumber**(`input`): `VersionNumber`

#### Parameters

##### input

The input to create a new instance of `VersionNumber` from.

`string` | `VersionNumber` | \[`number`, `number`, `number`\]

#### Returns

`VersionNumber`

## Properties

### major

> `readonly` **major**: `number` = `0`

The major number. Increments when a feature is removed or changed in a way that is not backwards-compatible with the previous release.

***

### minor

> `readonly` **minor**: `number` = `0`

The minor number. Increments when a new feature is added/deprecated and is expected to be backwards-compatible with the previous release.

***

### patch

> `readonly` **patch**: `number` = `0`

The patch number. Increments when the next release is fixing a bug or doing a small refactor that should not be noticeable in practice.

## Accessors

### type

#### Get Signature

> **get** **type**(): [`VersionType`](../type-aliases/VersionType.md)

Gets the current version type of the current instance of `VersionNumber`.

##### Returns

[`VersionType`](../type-aliases/VersionType.md)

Either `"major"`, `"minor"`, or `"patch"`, depending on the version type.

## Methods

### \[toPrimitive\]()

> **\[toPrimitive\]**(`hint`): `string`

Ensures that the VersionNumber behaves correctly when attempted to be coerced to a string.

#### Parameters

##### hint

Not used as of now, but generally used to help with numeric coercion, I think (which we most likely do not need for version numbers).

`"string"` | `"number"` | `"default"`

#### Returns

`string`

A stringified representation of the current version number, prefixed with `v`.

***

### format()

> **format**(`options?`): `string`

Get a formatted string representation of the current version number

#### Parameters

##### options?

`FormatStringOptions`

Options to apply to the string formatting.

#### Returns

`string`

A formatted string representation of the current version number with the options applied.

***

### increment()

> **increment**(`incrementType`, `incrementAmount?`): `VersionNumber`

Increments the current version number by the given increment type, returning the result as a new reference in memory.

#### Parameters

##### incrementType

[`VersionType`](../type-aliases/VersionType.md)

The type of increment. Can be one of the following:
- `"major"`: Change the major version `v1.2.3` → `v2.0.0`
- `"minor"`: Change the minor version `v1.2.3` → `v1.3.0`
- `"patch"`: Change the patch version `v1.2.3` → `v1.2.4`

##### incrementAmount?

`number` = `1`

The amount to increment by (defaults to 1).

#### Returns

`VersionNumber`

A new instance of `VersionNumber` with the increment applied.

***

### toJSON()

> **toJSON**(): `string`

Ensures that the VersionNumber behaves correctly when attempted to be converted to JSON.

#### Returns

`string`

A stringified representation of the current version number, prefixed with `v`.

***

### toString()

> **toString**(): `string`

Get a string representation of the current version number.

#### Returns

`string`

A stringified representation of the current version number with the prefix.

***

### isEqual()

> `static` **isEqual**(`firstVersion`, `secondVersion`): `boolean`

Checks if the provided version numbers have the exact same major, minor, and patch numbers.

#### Parameters

##### firstVersion

`VersionNumber`

The first version number to compare.

##### secondVersion

`VersionNumber`

The second version number to compare.

#### Returns

`boolean`

`true` if the provided version numbers have exactly the same major, minor, and patch numbers, and returns `false` otherwise.
