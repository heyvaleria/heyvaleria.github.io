---
layout: post
author: Valeria
title: "Don't be foooled by TypeScript's literal types"
date: 2022-09-02
categories: coding typescript
---
Disclaimer: I can't find a fun way to talk about this.

Say you're working with TypeScript and you get this error,
when you're trying to declare a variable,
a constant, an object with some key value pairs that you intend to use
further down in your front-end component:

``` ts
const SOME_COOL_KEYS_I_CAN_USE_LATER = {
  nickname: 'nickname',
  phone: 'phone number',
}
```

```
// pseudo-code alert:
<form>
  <label>
    ${SOME_COOL_KEYS_I_CAN_USE_LATER.nickname}
    <input type="text" name={SOME_COOL_KEYS_I_CAN_USE_LATER.nickname} />
  </label>
  <label>
    ${SOME_COOL_KEYS_I_CAN_USE_LATER.phone}
    <input type="tel" name={SOME_COOL_KEYS_I_CAN_USE_LATER.phone} />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Error:
```
Argument of type 'string' is not assignable to parameter of type '"nickname" | "phone"'. ts(2769)
```

Typescript wants me to cast the constant into a literal type.

---

**Note to self**
A Literal type is different than the [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions), like:
```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

I mean this part, `as HTMLCanvasElement`

---

In particular, from the [typescript documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference) (but the text in bold is mine):
> When you initialize a variable with **an object**,
> TypeScript assumes that the properties of that object **might change values later**.

And therefore I need to cast and convert the whole object using `as const` to be type literals if I explicitely don't want it to change.

``` ts
const SOME_COOL_KEYS_I_CAN_USE_LATER = {
  nickname: 'nickname',
  phone: 'phone number',
} as const
```

Thank you [Justin](https://github.com/jutonz)!
