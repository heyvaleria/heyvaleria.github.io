---
layout: post
author: Valeria
title: "Elementary School of Refactoring"
date: 2022-03-14
categories: coding
---
Refactoring is always a huge subject, difficult to apply, let alone to master,
and to talk about, for me.
While pairing with a client's developer, I was only scratching the surface of
the possibility of refactoring one file, and started seeing all the waterfall
implications. It's hard to know where to start. It's harder to know where to stop.

We were working with the [Money Rails gem](https://github.com/RubyMoney/money-rails),
as it was implemented in the codebase we are working on.

First issue, our version of Money was monkey patching a class method,
[#rates](https://rubydoc.info/gems/money/6.16.0/Money/Bank/VariableExchange#rates-instance_method)
that is supposed to be deprecated.

What should we so there? Leave it?
On top of that, the patched version of `#rates` was calling another method, which
had the current month as an argument.

But our goal was to be able to calculate flexible rates, also for a month in the
past.
My naive instinct was to let rates take an argument, for the month we wanted.

```ruby
def rates(month)
  something_cool(month)
end
```

they made me notice it was not a good idea to change the signature of a method,
not just about replacing all the occurrences, although we could have used a
default argument:

```ruby
def rates(month: Date.current.month)
  # or another million ways you can get the month
  something_cool(month)
end
```

But it was a bad idea to change the signature of a class method that we already
monkey patching from a gem, and deprecated...


Then I suggested maybe we could have made a duplicate method that did what we
needed, for months in the past.
But they told me it was not a good idea to have a mix of custom methods and
built-in methods on the Money gem we were implementing.

In the end we opted for a new method that called another private existing method,
that took the argument. But since it became a straight up delegate, as the
private method was used only in another place, we surfaced it to the public
method and renamed it something more relevant and generically usable.
