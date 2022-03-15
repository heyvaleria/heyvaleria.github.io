---
layout: post
author: Valeria
title: "RSpec Custom Matchers"
date: 2022-02-03
categories: coding rspec
---
To make a custom matcher leveraging
[Relish's DSL](https://relishapp.com/rspec/rspec-expectations/docs/custom-matchers/define-a-custom-matcher),
in our `spec/suppport/matchers` folder, we create a new file named what the
matcher will do, like `be_an_orange_button.rb`

``` ruby
RSpec::Matchers.define(:be_an_orange_button) do |expected|
  match do |actual|
    actual[:class].include? "orange"
  end

  diffable

  failure_message do |actual|
    "expected #{actual} to be orange"
  end

  failure_message_when_negated do |actual|
    "expected #{actual} NOT to be orange"
  end
end
```

By using `failure_message` we override and customize the error message shown when we run
the spec.

`diffable` is also part of the DSL that [Relish
provides](https://relishapp.com/rspec/rspec-expectations/v/3-10/docs/custom-matchers/define-diffable-matcher)
us and it will make the result look like

```
expected #<Capybara::Node::Element:0x00007f8541371d88> to be orange
   Diff:
   @@ -1 +1 @@
   -[]
   +#<Capybara::Node::Element tag="div" path="/HTML/BODY[1]/DIV[1]/DIV[2]/FORM (etc)
```

Instead of only failing like:

```
expected #<Capybara::Node::Element:0x00007f8541371d88> to be orange
```

It helps us see what went wrong, color coded in red and green as well in the
terminal, if your supports it.


In our spec files, we can use it like:

``` ruby
expect(button).to be_an_orange_button

expect(button).not_to be_an_orange_button
```
