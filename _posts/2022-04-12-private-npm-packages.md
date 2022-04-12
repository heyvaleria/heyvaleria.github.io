---
layout: post
author: Valeria
title: "npm public and private packages and modules"
date: 2022-04-12
categories: coding
---

[Official documentation](https://docs.npmjs.com/packages-and-modules/introduction-to-packages-and-modules)

In most cases, packages and modules of a JavaScript project are added and loaded
from the `package.json` file.

# Difference between a package and a module, public and private

From the docs:
- A package is a file or directory that is described by a package.json file.
- A module is any file or directory in the node_modules directory that
can be loaded by the Node.js `require()` function.

Unscoped packages are always public, like:

```js
"devDependencies": {
  "nodemon": "^2.0.15"
}
```

Private packages are always scoped and scoped packages are private by default.
This is an example of a scoped public package:

```js
"dependencies": {
  "@google-cloud/functions-framework": "^3.1.0"
}
```

Private packages can be made with a paid account (user or organization)
and they have a user or organization scope.
