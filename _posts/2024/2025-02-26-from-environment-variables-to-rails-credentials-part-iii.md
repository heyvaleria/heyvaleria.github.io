---
layout: post
author: Valeria
title: "Zero-downtime with Rails credentials part III"
date: 2025-02-26
categories: coding
---

We left you hanging with a big question, whether we still need an `.env` file after all. Here’s the answer…

Credentials don’t fully replace `.env`
In an ideal world we would not need to have a .env file at all.

When we originally started this task, we thought credentials would replace environment variables in their entirety.

However, as you may have already guessed, at the very least we need 2 environment variables even when using credentials:

`RAILS_ENV`
`RAILS_MASTER_KEY`
`RAILS_ENV` tells the application which environment it is when it loads and guides the application towards the correct credentials file for that environment.

`RAILS_MASTER_KEY` allows Rails to decrypt the credentials.

Without these 2 environment variables, Rails would not be able to infer which credential file to use and how to encrypt it.

...continue reading on the [thoughtbot blog](https://thoughtbot.com/blog/from-environment-variables-to-rails-credentials-part-three)

Co-authored-by: [Sami Birnbaum](https://thoughtbot.com/blog/authors/sami-birnbaum)
