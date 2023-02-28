---
layout: post
author: Valeria
title: "Git branch in terminal"
date: 2023-01-11
categories: coding
---
Another quick one, today.

I use [`ohmyzsh`](https://ohmyz.sh/) and I couldn't stand how, since my new machine, when I did `git branch`
it would open in a separate window/view, instead of listing the branches on the terminal.

Until now I was just annoyed by it, today I decided to find the solution via
[this stackoverflow](https://stackoverflow.com/questions/50525244/git-command-output-is-in-editor-vim-and-not-directly-to-terminal-output).

Or add this to your `~/.gitconfig`:

```
[pager]
     branch = false
```
