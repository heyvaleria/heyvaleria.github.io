---
layout: post
author: Valeria
title: "Remove annoying sound from VSCode"
date: 2024-03-18
categories: coding
---

In VSCode I use the keybindings from Atom, the old editor.

I move lines up and down using "Control + Command + Arrow Up" and "Arrow Down".

In VSCode when I move a line down with "Control + Command + Arrown Down"
there is an annoying error sound that, like the Terminal sound.
This is a known bug related to [Electron](https://github.com/Microsoft/vscode/issues/44070),
apparently.

# The solution 🙌

Create a file for default keybindings and edit it (I use VIM 😉):

`vim ~/Library/KeyBindings/DefaultKeyBinding.dict`

Add this exact content to it, save it.

```bash
  {
    "@^\UF701" = "noop:";
  }
```

I got the keybindings from [this gist](https://gist.github.com/trusktr/1e5e516df4e8032cbc3d)
where `@` is Command, `^` is Control and `\UF701` is Arrow Down.

Restart VSCode. DONE.
