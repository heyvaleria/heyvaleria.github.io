---
layout: post
author: Valeria
title: "Time Helpers"
date: 2022-01-07
categories: coding rails rspec
---
# Time Helpers

## AKA you do not need Timecop

In the past I have used the
[timecop](https://github.com/travisjeffery/timecop) gem in specs to make sure I
froze time properly and avoid brittleness around dates in RSpec.

TIL that I can use the built-in Rails [Time
Helpers](https://api.rubyonrails.org/v5.2.6/classes/ActiveSupport/Testing/TimeHelpers.html)
to achieve the same results. Other than the following example, keep in mind all
the other nifty "travel" options in the docs.
These time helpers were introduced in Rails 5.

I can use `travel_to` but I would have to put it in a `before` block.
So even better, I can wrap everything in the `it` scenario in a `freeze_time`
block, which

> Calls travel_to with Time.now.

```
describe Foo do
  it "bars at will" do
    freeze_time do
      user = FactoryBot.create(
        :user,
        first_name: "bar",
        anniversary: Date.current
      )

      expect(user.first_name).to eq("bar")
      expect(user.anniversary).to eq(Date.current)
    end
  end
end
```

Applauses and rideau.

### THE END
