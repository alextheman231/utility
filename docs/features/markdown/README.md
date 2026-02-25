**@alextheman/utility v5.4.1**

***

# @alextheman/utility

![npm version](https://img.shields.io/npm/v/@alextheman/utility)
![npm downloads](https://img.shields.io/npm/dm/@alextheman/utility)
![npm license](https://img.shields.io/npm/l/@alextheman/utility)

[![CI](https://github.com/alextheman231/utility/actions/workflows/ci.yml/badge.svg)](https://github.com/alextheman231/utility/actions/workflows/ci.yml)
[![Publish to NPM Registry and GitHub Releases](https://github.com/alextheman231/utility/actions/workflows/publish.yml/badge.svg)](https://github.com/alextheman231/utility/actions/workflows/publish.yml)
[![Publish to Netlify](https://github.com/alextheman231/utility/actions/workflows/netlify-docs-publish.yml/badge.svg)](https://github.com/alextheman231/utility/actions/workflows/netlify-docs-publish.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/74fd3eaf-3002-472b-ae5e-2bd0ab984b9e/deploy-status)](https://app.netlify.com/projects/alextheman-utility-docs/deploys)

This is my personal utility package. It provides custom utility functions that can be used in more or less any TypeScript or JavaScript project, using either the browser or Node environment.

## Installation

To install this into your project, you can do so with the following command:

```bash
npm install @alextheman/utility
```

From there, you may import any of the package's functions.

## Quick start

You can import and use any function or type from the package in the following way:

```typescript
import type { NonUndefined } from "@alextheman/utility";

import { formatDateAndTime } from "@alextheman/utility";

const myVariable: NonUndefined<string> = formatDateAndTime(new Date());
// ...
```

## Documentation

You can find the relevant documentation of all features of the package in the [docs/features/markdown](https://github.com/alextheman231/utility/tree/main/docs/features/markdown) directory of the repository. The hosted documentation site can be found [here](https://alextheman-utility-docs.netlify.app/).

See the GitHub repository [here](https://github.com/alextheman231/utility).
