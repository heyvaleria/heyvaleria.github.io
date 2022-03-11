---
layout: post
author: Valeria
title: "Length validation"
date: 2021-12-01
categories: rails coding
---
# Length validation

In the client's codebase I found a length validation for presence (minimum: 1) of an object
connected via an association.
Usually the length association is used for something like minimum amount of
characters of a username or a password.
[Validation](https://guides.rubyonrails.org/active_record_validations.html#length)

> :minimum - The attribute cannot have less than the specified length.
>
> :maximum - The attribute cannot have more than the specified length.
>
> :in (or :within) - The attribute length must be included in a given interval. The value for this option must be a range.
>
> :is - The attribute length must be equal to the given value.

The validation looks like this
validates :ice_cream_flavors, length: {minimum: 3}
validates :username, lenghth: {minimum: 8}

The key in the i18n file will be too_short (or too_long), in case we want to
overwrite the error message.

[rails repo](https://github.com/rails/rails/blob/f95c0b7e96eb36bc3efc0c5beffbb9e84ea664e4/activemodel/lib/active_model/locale/en.yml#L21)

I see why finding the `too_short` on its own confused me, ans I rather expected
a presence: true type of validation.

Still from the docs
> when :minimum is 1 you should provide a custom message or use presence: true instead

Still, it seems like scratching the side of your face with the opposite hand. :)
But at least now I understand why it was written this way.
