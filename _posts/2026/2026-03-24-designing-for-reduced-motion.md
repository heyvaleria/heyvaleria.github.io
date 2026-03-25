---
layout: post
author: Valeria
title: "Your carousel might not be accessible: designing for reduced motion"
date: 2026-03-24
categories: accessibility design development coding inclusive-design
---

On a website I worked on, I noticed some logos stacked vertically on the left
instead of being spread horizontally and evenly spaced, as I expected,
and as the design clearly suggested.

Opened an issue. Carefully listed browsers and versions.
I investigated like a careful end-user. Not like a developer solutionizing on
it, and looking at the code yet.
I thought I just found a bug while doing something else, I was not there to drop
everything and fix it on the spot.

Hard reload. Cleared cache. Tried again. Same problem. Oh well, it's a bug.

A designer checked and told me it looked fine for them.
So... at that point I was puzzled. 🧐

Then it clicked.
I have Reduce Motion enabled in my system settings.

So yeah, it wasn't a bug... or was it just a different kind of bug?

That's when it hit me: a scrolling set of logos, a carousel, isn't inherently
accessible. And more importantly, when a user opts into reduced motion for
accessibility reasons, we need to ensure that the layout stays intact, and with
it, the meaning of the content.

A pretty common UI pattern like a carousel suddenly became... not so inclusive.

If you'd asked me yesterday whether a carousel of moving items is accessible
design, I would have said, "sure, why not?"

Today, I'd say: not entirely.
Not unless there's a proper fallback, a static list of items that preserves
layout and still communicates the same information clearly.

Because accessibility isn't just about turning things off.
It's about making sure the experience still works when things change.

And the good news is, this is something we can account for.

```
@media (prefers-reduced-motion: reduce) {
  /* provide a non-animated, stable layout */
}
```

A small detail, but one that can make the difference between something that
looks fine, and something that actually works for everyone.

Reference: [prefers-reduced-motion on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
