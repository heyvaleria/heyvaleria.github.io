---
layout: post
author: Valeria
title: "Install ruby 3.1.2 on Apple M1"
date: 2022-10-18
categories: coding ruby
---
This post is relevant as of mid-October 2022, and linked to this
[issue-turned into a discussion](https://github.com/rbenv/ruby-build/discussions/2066) I opened on `ruby-build`.

I am positive that `ruby-build` will be patched and contain the necessary code to
install ruby with Xcode 14 on Monterey OS and M1 chip,
but maybe you can find this post useful to get you unstuck in the meantime.

I got a brand new Apple machine, with a fancy M1 chip, Monterey 12.6 and Xcode 14.
I was trying to install the whole setup of the Ruby project I'm working on. I need ruby 3.1.2.

The error manifested as such, during the `bundle` step:
```
warning: It seems your ruby installation is missing psych (for YAML output).
To eliminate this warning, please install libyaml and reinstall your ruby.
```
The error is not `libyaml` itself (you can `brew install` it as much as you want, it won't do) nor the `psych` gem
that is using it.
The issue is that Ruby is not being installed.

I had `rvm` installed. Plus maybe another version of ruby installed via `brew` as well as the system ruby
(untouchable/shouldn't mess with it).
Certainly a bit of a mess.

I tried uninstalling `rvm` using the `implode` command, and use `asdf` instead, following the
[laptop script](https://github.com/thoughtbot/laptop/blob/main/mac)
some folks often use at [thoughtbot](https://thoughtbot.com/), that I had not used before.

`asdf` installs ruby leveraging `rbenv`'s `ruby-build` and that's how we found the
[reported bug](https://bugs.ruby-lang.org/issues/18912), that's being patched.

This was still failing, downloading an alternative (to the existing on the machine) own version
of `openssl`, as we noticed. (and maybe other alternative moves)

Installing ruby from its source, running `./configure` and `make` was outputting the same error.

Meanwhile we decided to downgrade **Xcode to 13** and try harder.

At this point we removed all the content of `~/.asdf` and reinstalled the ruby plugin (and node's):
```
asdf plugin-add "ruby" "https://github.com/asdf-vm/asdf-ruby.git"
asdf plugin-add "nodejs" "https://github.com/asdf-vm/asdf-nodejs.git"
```

We installed ruby using purely `ruby-install` this time, making sure we nuked all the `rvm` leftover stuff as well
using `rvm implode` -> `yes`
We are still not sure why `rvm`'s `ruby-build` wouldn't do the same thing. (it should)

---

### Using `ruby-install` directly ensures that the install command fetches the package manager version of the needed libraries, used as arguments when running the `./configure` when building ruby.

---

This install was successful, and placed our ruby 3.1.2 into the `~/.rubies/ruby-3.1.2` folder.

By now, `/.asdf` should also exist.

We need to copy the artifacts of that installation we did using `ruby-install` to be available to `asdf` as well.

We ran:
```
ruby-install --install-dir ~/.asdf/installs/ruby/3.1.2 ruby 3.1.2
```

The other thing that we needed to remove any leftover junk from the `$PATH` on my `.zshrc` file,
that got messed up big times, after all these clunky initial attempts of mine.
As well as the source path for `asdf` adding to `.zshrc`:
```
. /opt/homebrew/opt/asdf/libexec/asdf.sh
```

Good luck! 😉

---
Thanks to [Nick](https://github.com/nickcharlton) for the immense help.
And thanks to [Fritz](https://github.com/iftheshoefritz) for showing me how ruby actually gets installed.
