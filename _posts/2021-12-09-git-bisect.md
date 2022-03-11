---
layout: post
author: Valeria
title: "git bisect to the rescue"
date: 2021-12-09
categories: coding git
---
# git bisect to the rescue

[Documentation](https://git-scm.com/docs/git-bisect)

One of the popular favorites at thoughtbot, at least in the boost team, is `git bisect`.
It helps you find when/where (in which commit) a certain part of the code broke.

It's pretty magic and this is how you use it.

Start:

`git bisect start`

Git checkout the branch that you know is good, where the code is working and:

`git bisect good`

Git checkout the broken branch and set it as bad:

`git bisect bad`

This can be accomplished in various ways, say you know something is currently broken
in `main`, you can declare it from a different branch:

`git bisect bad main`

Or you want to go back in time, so you can checkout the SHA of a commit that you
know is bad, and maybe go 3 step back and use:

`git bisect good HEAD~3`

Then git starts doing its magic.
Keep going, running `git bisect good` or `bad` in case you're "going back or
forth."

At the end you'll see what was the commit that broke the code. Yay.

To exit:

`git bisect reset`

In the docs there are a lot of additional nifty things you can do, but this is
already cool basic usage that gets the job done.
