---
layout: post
author: Valeria
title: "Time Helpers Part 2"
date: 2022-03-16
categories: coding rspec
---
## Rails Time Helpers part 2

In the first post about [time helpers](https://heyvaleria.github.io/coding/rspec/2022/01/07/rails-time-helpers.html)
I talked about `freeze_time` and `travel_to`.

Believe it or not, it turns out you can also `unfreeze_time` or `travel_back`.
And that turned out to be useful in a huge existing spec with a `travel_to` set
in the before action and still allowed us to travel to a different date in the
specific scenario we were testing.
RSpec will get mad at you if you attempt at using a `travel_to` or even a `travel`
block in the scenario or context otherwise.

The following example is not great in terms of content. It's about the usage:

```ruby
describe Foo do
  # ouch I know, it was already there! :/
  before do
    travel_to(Date.new(2020, 10, 15))
  end

  context "bar" do
    it "goes somewhere else" do
      # use unfreeze_time or travel_back
      travel_back
      user = FactoryBot.create(:user, name: "Foo")

      # then go 2 days in the future
      travel 2.days do
        user.update(name: "Bar")
      end

      expect(user.name).to eq("Bar")
    end
  end
```

Documentation on [travel_back](https://api.rubyonrails.org/classes/ActiveSupport/Testing/TimeHelpers.html#method-i-travel_back)
