---
layout: post
author: Valeria
title: "sub vs gsub in Ruby strings"
date: 2021-12-03
categories: ruby coding
---
# `sub` vs `gsub` in Ruby strings

While talking to [Edward](https://github.com/edwardloveall), a quick example in
the ruby console came up, to remind us that if we want to replace all the
occurrences in a string, we need to use `gsub`, and `sub` is not enough.

```
"foo,foo".sub(",", "")
=> "foofoo"

"foo,foo,foo".sub(",", "")
=> "foofoo,foo"
```

From the ruby docs on [sub](https://ruby-doc.org/core-2.4.2/String.html#method-i-sub)
> Returns a copy of str with the _first_ occurrence of _pattern_ [...]

So if we want to replace all the occurrences we should use
[gsub](https://ruby-doc.org/core-2.4.2/String.html#method-i-gsub)
> Returns a copy of str with the _all_ occurrences of _pattern_ [...]

```
"foo,foo,foo".gsub(",", "")
=> "foofoofoo"
```
