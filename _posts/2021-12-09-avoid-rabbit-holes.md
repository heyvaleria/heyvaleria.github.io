---
layout: post
author: Valeria
title: "Avoid Rabbit Holes"
date: 2021-12-09
categories: coding
---

# Avoid Rabbit Holes

I was working on fixing a bug with the help of
[Greg](https://github.com/gnfisher) and I already tried a million things so I
can use a fresh pair of rubber duck eyes to get me out of the rabbit hole I was
miserably digging for myself.

He was capable in diverting my attention from the bug that I was trying to fix by
asking me if I was sure this wasn't already happening in `main` and introduced
by some other commit.

So first we tested the same scenario again in `main` and confirmed that it was
indeed already happening. Which I had noticed but was still blaming myself, as I
was trying to fix a previous feature I wrote and thought my previous code had
somehow introduced that bug before.

Then it was time to figure out which commit added it.

No better occasion that this one, to start using `git bisect` (yet  another
[TIL](./2021-12-09-git-bisect.md))
which I have used once before with
[Edward](https://github.com/edwardloveall).

It was fun, quick and easy. It only took us three lobster-steps back to find the
culprit.

It also turned out the bug was indeed introduced by another commit, and
interestingly enough the tests were all green, eh.

Once I talked to the other developer and they fixed the code, my code was now
working as intended. Yay!
