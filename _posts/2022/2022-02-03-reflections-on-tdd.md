---
layout: post
author: Valeria
title: "Reflections on  writing tests before or after writing a method"
date: 2022-02-03
categories: coding tdd
---
I was chatting with [Joël](https://github.com/JoelQ) and was trying to improve
my approach in writing tests and code, the philosophy, key things to consider,
and reach greater finesse.
Here some of the outcomes:

## TDD, write tests before writing the method

1. As a developer and a human, it makes me feel more confident about
   the code I am about to write, that I really understand it and there is no
   guess component in it.

2. I am thinking of all the possible scenarios and the edge cases as well.

   On this, also  see this
   [great article by Joël](https://thoughtbot.com/blog/testing-your-edge-cases)

## Backfill the tests after I already wrote the method

1. As mentioned above it gives me more uncertainty:
   - "I think it should work like
   that...";
   - "In theory this object should exist at this point..." which is not
   always true;
   - And overall the tendency is to have a more complex test setup,
   sometimes declaring more objects than necessary, creating them instead of
   building or stubbing them, all aspects that will lead to less elegant and
   performant code in the end.

2. It forces me to think in terms of "happy path" and "sad path" rather than
   testing all the cases.
   Namely it is easy to forget about edge cases as mentioned above on point 2.

3. I may write a test that would pass no matter what (hint: even if you end up in
   this scenario, do not despair, when the test is green,
   try to assert the opposite and watch it fails with satisfaction)
   Related to this, Joël suggested the deletion of lines of code and observe the
   behavior, as there could be what he called "dead code".)
