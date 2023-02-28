---
layout: post
author: Valeria
title: "What is an API? For non-developers"
date: 2022-03-13
categories: coding
---
What is an API? Once asked me a non-developer.

Short answer: it's a URL.

Longer answer, focusing on concepts, and over simplifying:

Imagine you have a database with all your customers' info.
Imagine you want to know (query) all your customers who are located in the USA.

In a query to the database you may look for something like (pseudocode,
cause it does not matter) `where country = USA`.

The API is that URL that you type in the address bar of your browser adding
add those query params (pseudocode, cause it still does not matter)
`https://www.my-website-api.com/customers?country="USA"` and as a result you will get
on your browser all those customers located in the USA, as a, buzzword alert, JSON object.

But who cares.

The one described above was a GET request, because you want to get existing results from the database.

Or if we know we want to see all the info for the customer with id 12345, we may send
a GET request to `https://my-website-api.com/customers/12345` and we will get the info of that customer.

If you want to add a new customer to the table, the developers may have a similar URL for you, which
will POST to the database, adding a new row.

In the URL we will need to specify all the required fields (you need to know them from the
documentation) so the URL could be like:
(do I still have to say that this is pseudo code? Cause it is):
`https://www.my-website-api.com/customers/?first_name="Foo"&last_name="Bar"&country="USA"`

You can also edit and delete a customer. And it's a mix between the ones above: to edit PUT
you need to pass the customer id and what field you want to edit, to delete, I mean DELETE,
you also need to pass the id of the customer you want to delete. But this is already
more than you need to know right now.

And when you hear the buzzword REST or RESTful, this is what they are talking about, and now you can, too.
