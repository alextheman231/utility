[**@alextheman/utility v5.1.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / getDependenciesFromGroup

# Function: getDependenciesFromGroup()

> **getDependenciesFromGroup**(`packageInfo`, `dependencyGroup`): `Record`\<`string`, `string`\>

Get the dependencies from a given dependency group in `package.json`.

## Parameters

### packageInfo

`Record`\<`string`, `unknown`\>

The data coming from `package.json`.

### dependencyGroup

`DependencyGroup`

The group to get dependency information about (can be `dependencies` or `devDependencies`).

## Returns

`Record`\<`string`, `string`\>

A record consisting of the package names and version ranges from the given dependency group.
