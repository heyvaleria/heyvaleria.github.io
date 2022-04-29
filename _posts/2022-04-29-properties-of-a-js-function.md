---
layout: post
author: Valeria
title: "Properties of a JavaScript function"
date: 2022-04-29
categories: coding
---

Thanks to [Chris](https://github.com/whitecl) for the mentoring session!

_Slightly similarly_ to instance methods in Ruby, in JavaScript we can define
properties for a function, and pretty much on the fly.

I was quite mind-blown by the fact that I can treat a function like an Object,
and since it's like an Object because **IT IS** an Object, we can assign new
properties as **key-value pair**, and let's see the cool thing is that the value
can be.

Say we have a function User:

```js
function User() { console.log("Hi, I am a user!") };

> User()
 I am a user
```

Now I want to assign a property as a boolean that tells us the status of the user,
whether they like ice cream from what we know:

```js
User.likeIceCreamDefault = false

> User.likeIceCreamDefault
 false
```

Now let's add a name to the user for the sake of our example, so we assign a
string as a variable for the property:

```js
User.firstName = "Frankie"

> User.firstName
 'Frankie'
```
(☝️ Single quotes in the response, cause this is JS, and Chrome knows 🤣 )

And the last I want to show is that I can assign a function as a property:
```js
User.iceCreamForFrankie = () => { if(User.firstName === "Frankie") { console.log("I love ice cream"); return true } }

> User.iceCreamForFrankie()
 I love ice cream
 true
```

Since these are key-value pairs, if I want to list all the available properties
that were created for this function I can call:

```js
Object.keys(User)
> (3) ['likeIceCreamDefault', 'firstName', 'iceCreamForFrankie']
```

Don't take my word for it, try it in your Chrome console.

This example is trivial, but hey, TIL.
