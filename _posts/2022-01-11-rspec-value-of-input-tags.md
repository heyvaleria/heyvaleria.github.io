---
layout: post
author: Valeria
title: "Expectations for an input tag"
date: 2022-01-11
categories: coding rails rspec
---
# Expectations for an input tag

If you have an input field, text field, email field etc,  in a form and you
think:

``` ruby
❌ expect(page).to have_content "foo@bar.com"
```

Think again.

For input fields you need to check the VALUE:

``` ruby
✅ expect(find("#user_email").value).to eq("foo@bar.com")
```

You may also be able to do:

``` ruby
expect(page).to have_field('Email', with: 'foo@bar.com')
```

### Will I remember it now?
