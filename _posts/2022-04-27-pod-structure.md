---
layout: post
author: Valeria
title: "File structure in a codebase: Pod structure vs not"
date: 2022-04-27
categories: coding
---
Thanks to [Chris](https://github.com/whitecl) for the illuminating chat.


OK, so one is called **pod structure** and let's decide that we call the non-pod
structure the **category structure**.

What do I mean?

In our codebase we can decide to group our files by category, like in a typical
Rails project, where let's be honest, the structure has been chosen for us by the
`rails new` command.
The files are divided by their functionality: we have models, and all the models
are there, the controllers, the views and so on. Then the sub folders have specific
resources names, like user, post or what have you.

The pod structure that we often find in JS, React, TS and these "modern" applications
(why in quotes? cause Rails ain't old!).

In these projects we typically find a huge `/src` foldern and in it you have the
various resources divided folders and in each folder you have all sorts of stuff
that pertains to that resource: `index.tsx`, css, specs (!!!) and other junk
that is all technically about the user or what have you.

### Opinionated take on pros and cons
In the category structure it may be hard to go find a specific spec for something,
or importing required files can be a `../../../` relative path hell.
In the pod structure everything is grouped but it is very prone to code and files
duplication.

What's the common solution you see? A fearsome `/shared` folder, where, for example
you can group all those shared, that is, UI components, like buttons, cards etc.
and their css, and their specs, and the rest of the mess...

Before you know the shared folder is a catchall for a lot of junk in the name of
sharing code and not duplicating.
It doesn't seem a great advantage.

But I also hate hunting for specs in rails, especially feature specs...I can
never find them quickly cause they're named whatever.
