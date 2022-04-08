---
layout: post
author: Valeria
title: "Basic React TIL"
date: 2022-04-07
categories: coding
---

Thanks to [Diego](https://github.com/codeofdiego) for explaining and help me understand.
I know posting images with text is not accessible.

I apologize. I should make a better version later, with a code snippet and text comments.
![first step](/assets/images/1.png)
Some clarifications:
this is now the whole code of the file, because I was focusing on certain aspects,
but I'm passing the tea whole object in `setFilterBy()`.
Up above I have an array of objects called `teaTypes` (you see the loop in the view below)
And the keys are `label` and `range` (because it's the duration of the songs I'm filtering)

![second third step](/assets/images/2-3.png)

![fourth step](/assets/images/4.jpg)

![recap](/assets/images/5.jpg)
In conclusion addendum: the fact that the setState hook is always about passing
info to be re-rendered either without change (if the state hasn't changed)
or re-rendered in a new way by calling the whole DOM with a new set of data...or state.


There was a previous version of these screenshots that I lost forever, so these
other versions are slightly less taken care of and polished.

## Additional notes

The new approach was opposed to my outdated mental non-React approach
like a traditional "cause and effect" approach:
- I have a button in the DOM
- it calls a JS function `onClick`
- I feed the function an argument to call another function to
manipulate the data, and that changes that one part of the calculation
that happens in the traditional JS function, I wanted to use the
clicked argument to pass to a traditional JS function, and ***I was
stubborn and stuck and couldn't wrap my head around this even after
reading the documentation on the React site***. But React doesn't
work like that.

Hard to explain as I'm still a beginner, but the concept of always
thinking from the top down or as if it is always refreshing to a new
view was a mind-blowing aspect I did not explain it well in the screenshots alone.

While here, in React-land it's more like its constantly "flushing" the DOM and
showing me a new state of it, and the click handler only triggers the
change, the call to the upper level to "flush everything" and give me
the new overall picture.
***Disclaimer:*** I'm making words up here. This is not React language at all.

But of course re-rendering the "flushed" view changing only those
components that had changed, while the rest, leveraging the hooks like
useMemo, for example, will remember the previous cached iteration
(state) where if nothing changed, without recalculating of making
another call to the endpoint or what have you will show you the same
state as before. Nifty.

And the *initial state*, the third element in parenthesis in `useState`,
for example, will save us from future headaches of possible `null` or
falsey values if we try to, say, call `.map` on `undefined`.
And that's neat.

And I also learned that the hook will always only have those 2 items
in that strange array I saw at first and didn't understand.
Like where I have `const [songs, setSongs]` because one is the *variable*
and the other is the *function* that makes the change using the new
variable, if a new value is set.
This was mind-blowing, too.

And this is all I learned today in a 10-minute phone call with Diego
who explained this so simply and clearly that opened my mind to a new dimension,
and way to think about code.
