---
layout: post
author: Valeria
title: "button_to is not a button!"
date: 2021-12-10
categories: coding rspec
---
While working with [Matheus](https://github.com/MatheusRich) we were trying to
expect some text (the text on a button) to be on a page in a spec.

The self-reminder is that a rails `button_to` is not a `button` tag but it creates
`form` tag with an `input` with `value` of the "button's text" we have in the UI.

Ah, there will also
be a hidden input for the `id`, to pass with the form for submission to the
controller action.

[Documentation](https://apidock.com/rails/ActionView/Helpers/UrlHelper/button_to)

Post update:
1) Thanks to [Sean](https://github.com/seanpdoyle) soon we won't have to remember this!
[commit to Rails
7](https://github.com/rails/rails/commit/9af9458396d02ead8aa9d2f3ff39c7857cfe5eb1#diff-68404eacab886d3ef2d43242eb40e7e66d4ff6135433ecc8a821faffc6104586)

2) For the record, even in the way it is implemented today, we can pass a block to `button_to`
and render a `button` tag.
