---
layout: post
author: Valeria
title: "How to run and debug a Jest spec"
date: 2021-12-06
categories: coding javascript jest
---
Notes

- How to run a js spec file
`node_modules/.bin/jest --no-coverage -- spec/javascript/lib/path/to/file.spec.js`

(`--no-coverage` runs faster)

- How to run a scenario of a file
`node_modules/.bin/jest --no-coverage -t "my scenario title foo bar" -- spec/javascript/lib/path/to/file.spec.js`

- How to run it with the **debugger**

1) In your Chrome browser, in the address bar, type `chrome://inspect/#devices`

2) Click on the link "Open dedicated DevTools for Node"

This will open a new window

3) Place a `debugger;` in your code.

4) In your terminal run
`yarn test:debug  spec/javascript/lib/path/to/file.spec.js`


- How to run a jest spec and have yarn watch for changes (example below is in one scenario)
`yarn test:watch spec/javascript/lib/path/to/file.spec.js -t "my scenario title foo bar"`
