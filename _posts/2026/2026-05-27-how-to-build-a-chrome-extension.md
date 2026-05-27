---
layout: post
author: Valeria
title: "How I Built a Chrome Extension Wrapper (and Everything That Tried to Stop Me)"
date: 2026-05-27
categories: development coding chrome-extension
---

So one day a client came to me and said: "we want a Chrome extension."
Simple enough, right?

First thing to know: the client didn't want to build a _real_ extension from
scratch with its own codebase and logic. They wanted a _wrapper_,
essentially their existing Rails app, dressed up and living inside a
Chrome extension panel.

Same features, same views, same assets.
Just... accessible from the browser bar.

That sounds simpler than building from scratch. But, was it?

## Exploring options

Now, when it comes to Chrome extensions, there are a few main UI patterns:

- Side panel: slides in like a drawer on the right side of the screen
- Popup: the little window that appears when you click the extension
  icon in Chrome's toolbar
- Iframe overlay: inject an iframe into the current page,
  absolutely positioned wherever you want

The trigger can be a button injected into the page (via `content_scripts`,
positioned with CSS), or the native Chrome extension icon in the browser bar.
We explored a few options before eventually landing on a reference to model
it after.

We ended up going with an iframe approach: a wrapper around the main
Rails app, rendering its views and assets inside the extension panel.

## The Stack Problem: Rails Didn't Like This

Here's where it gets fun. The code for the extension, the page with the
trigger, the button, the iframe, all of it, lived inside the same Rails app
that hosted the main product. Why? Because it needed to render views and serve
assets from that app, and stay in sync if the main content changed.

But running two things from one Rails app (the main UI + the extension wrapper)
is... not a great time. Locally, we ran into endless `Rack-CORS` errors.
Trial and error sessions that felt like a personal war.

In hindsight, the much cleaner solution would have been to spin up a
separate lightweight app just for the extension code, pointed at the main
app as an API. Staying in one repo is a common and totally understandable
constraint: less duplication, easier to keep things in sync. The tradeoff
is exactly what we ran into: CORS complexity and two contexts fighting each
other locally. Worth knowing before you commit to that architecture.

## Auth: The Real Boss Fight

Okay, if CORS was annoying, auth was brutal.

The main app used Devise with cookie-based sessions. Totally normal for a
Rails app only. Totally terrible when you're trying to embed it inside a
Chrome extension where there's now **another** session in a different context.

Cookies + iframes + different origins = **CHAOS**. The sessions would conflict,
auth state got confused between the main UI and the extension view, and
debugging it felt like a nightmare.

The core issue: the extension iframe was loading the app from the same
origin as the main app, so cookies were being shared, but in ways that
weren't predictable or clean. Having the extension live in a separate
app/repo with its own auth flow would have made this much more manageable.


## Assets: Because Why Not Add One More Thing

Once auth was (mostly) sorted, the assets decided to have a turn.

Icons and images weren't rendering inside the iframe. The Rails asset
pipeline had opinions about how assets were served, and those opinions
didn't align with being loaded in a sandboxed Chrome extension context.
Some path adjustments and pipeline config tweaks later, it was working,
but it was one of those things where you fix it and never want to look at
it again.

## The Chrome Web Store Setup

Here's the practical stuff that I wish was better documented:

You need a Chrome Developer account: a Google account registered as a
Chrome Extension developer.

The client owned this account, which made sense since they'd be the publisher.
But the Chrome Extension developer account didn't support collaborators.
So deployments of staging versions had to go through the client's access.
That's a workflow you want to sort out early, when you are a developer on a
client project: nothing worse than needing to push a fix
and waiting for someone else to log in or test changes for you. And make
debugging an extra hard task.

Anyhow, in practice, this is the flow:
1. Create a placeholder app in the Chrome Web Store to get a unique extension ID
2. Hardcode that ID into your Rails config (initializers/environment config).
  It's used to toggle the extension open and controls how the iframe is allowed
  to load
3. Develop locally using `sandbox/unpublished mode`
4. Rotate to the production extension package when publishing


## What I'd Do Differently

- Separate repo for the extension code from day one.
  Fewer CORS headaches, cleaner auth, easier to reason about.
- Get a reference from the client early. When they finally showed me the
  competitor's extension they wanted to replicate, I'd already gone down
  two other paths. Ask "is there an example you want to match?" in the first
  meeting.
- Plan for auth early. If your main app uses cookie sessions, figure out the
  extension auth strategy before you write a line of extension code.
- Test assets in the extension context early. Don't assume the pipeline will
  just work cause it probably won't.


## TL;DR

Chrome extensions are powerful and actually not that hard in isolation.
The complexity explodes when you're wrapping an existing app with existing
auth and trying to share code. Clean separation of concerns is your friend.
CORS is your nemesis. And always ask the client if they have a reference
they want to take inspiration from.
