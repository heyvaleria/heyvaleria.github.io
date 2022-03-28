---
layout: post
author: Valeria
title: "Barebones Debugging"
date: 2022-03-28
categories: coding
---

I was stuck and getting stubborn in trying to understand a bug, until
[Sean](https://github.com/seanpdoyle) gave me a couple of useful debugging advice:
1. If there is a similar page where it works, look very carefully at the markup,
in that case a JSON object rendered to the page, and try to find the differences,
like in those games on [La Settimana Enigmistica](https://en.wikipedia.org/wiki/La_Settimana_Enigmistica)
back and forth, spotting the differences.
Sometimes a different key, or a lacking key could be enough to break things.

2. Start removing/commenting out all the code to the minimum until you find a state
where it's working. Then add things back in one at a time and find what caused
the feature to break.
This one I knew, and forgot after being digging the rabbit hole and being stubborn.
So it's always a good reminder.
