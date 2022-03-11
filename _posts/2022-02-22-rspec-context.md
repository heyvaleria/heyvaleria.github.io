---
layout: post
author: Valeria
title: "RSpec Context"
date: 2022-02-22
categories: coding rspec testing
---
# RSpec Context

When I see a description of a "it" that has an "if" or a "when" in the sentence,
I think this is likely missing a higher level "context" block.

The "it" is the exercise phase, the expected result of the method or feature.

Plus it makes it kinda backwards. Example:

```
it "wears sunglasses when the sky is blue" do
```

Here we are implying the sky is blue condition, which should be the context,
and we are hiding the fact that we should probably be testing what happens when the sky is not blue.

See also [in the testing
guidelines](https://github.com/thoughtbot/guides/tree/main/testing-rspec#unit-tests):

> Use `context` to describe testing preconditions.



So it could become:

```
context "the sky is blue" do
  it "wears sunglasses" do end
end

context "the sky is NOT blue" so
  "it shows an error for missing sunglasses" end
  or what have you, "it returns with no sunglasses" etc
end
```

Why is having an "it with and if/when" not ideal?
1. It suggests that there could be too much hidden logic in private methods, that has to be tested
   indirectly.

   If the spec fails we do not know why, and it will take longer to debug digging into
   what went wrong in any of those private methods.

   **POSSIBLE SOLUTION**: move the private methods to a separate class where they can be
   tested directly.

2. Having all these prerequisites to match the object to be tested, will make us
   have a much **more complex setup phase**, where the instance of the object (maybe created
   with a factory) may need a lot of extra attributes and/or traits applied to it.
