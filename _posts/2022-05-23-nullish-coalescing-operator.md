---
layout: post
author: Valeria
title: "Nullish Coalescing Operator in JS"
date: 2022-05-23
categories: coding javascript
---
Thanks to [Shanson](https://github.com/stevehanson) I learned a new JavaScript
operator: the [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) `??`

It it _like_ OR `||` but it returns the "default" value you want to assign,
where the OR operator would not return the  `undefined` or `null` value, but
the other.

### Example
```js
const myAge = 0;
myAge ?? 10
→ 0
// this returns 0

myAge || 10
→ 10
// this returns 10 because 0 in JavaScript is falsey

// The best way to spell out how this operator works is with this ternary:
myAge === null || myAge === undefined ? 10 : myAge
```

This operator is useful when dealing with falsey values that may not behave the
way we intend, for our business logic, in a function.
