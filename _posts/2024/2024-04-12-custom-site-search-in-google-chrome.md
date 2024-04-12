---
layout: post
author: Valeria
title: "Custom site search in Google Chrome"
date: 2024-04-12
categories: toolchain
---

We recently started using JIRA at the client I work with, and I remembered a
useful shortcut from a long time ago: making my own site search custom shortcut
to find JIRA tickets quickly.

### The way it works

In the address bar you can type `jira [space] CODE-123 [enter]` where CODE-123 is the
ticket's reference number.
This will autofill the URL with the ticket identifier variable and take you there
without passing from the Sprint or Board or pasting a whole URL.

### How to set it up

Go to Chrome > Settings > Search engine > Site Search > Click on Add

In the dialog add the name you want, then the shortcut field is the keyword you
want to use to start this site search, and the URL with `%s` in place of the query,
for example: `https://jira.my-beautiful-project.com/browse/%s`

Now when I type `jira [space] CODE-123 [enter]`, Chrome will load

`https://jira.my-beautiful-project.com/browse/CODE-123` for me! Yay!
