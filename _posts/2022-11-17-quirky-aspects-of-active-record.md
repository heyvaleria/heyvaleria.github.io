---
layout: post
author: Valeria
title: "Quirky aspects of Active Record"
date: 2022-11-17
categories: coding rails sql
---
There are some things I find confusing about Active Record [DSL](https://martinfowler.com/books/dsl.html).
I'm gonna write them down here so next time I get confused about them I have a place to go to and look them up:
# 1. `.joins` is in fact an INNER JOIN
---

# 2. If you want a LEFT JOIN you need to use `.left_joins`
Which is also the same as `.left_outer_joins`
[Rails docs for `.left_joins`](https://api.rubyonrails.org/v7.0.4/classes/ActiveRecord/QueryMethods.html#method-i-left_joins)

---

# 3. If you want a RIGHT JOIN you flip the `.left_joins`
Are there other ways?

---

# 4. If you want to join multiple associations, you use the comma
```
  Book.joins(:author, :reviews)
```

Which produces:

```
  SELECT books.* FROM books
  INNER JOIN authors ON authors.id = books.author_id
  INNER JOIN reviews ON reviews.book_id = books.id
```
[Reference](https://guides.rubyonrails.org/active_record_querying.html#joining-multiple-associations)

---

# 5. If you want a NESTED association, you do NOT use the comma, but you indicate the column
```
  Book.joins(reviews: :customer)
```

Which produces:

```
  SELECT books.* FROM books
  INNER JOIN reviews ON reviews.book_id = books.id
  INNER JOIN customers ON customers.id = reviews.customer_id
```

[Reference](https://guides.rubyonrails.org/active_record_querying.html#joining-nested-associations-single-level)<br>
And following paragraphs.

---

# 6. Use `.includes` to help reduce N+1 queries, and eager load
```
  Customer.includes(:orders, :reviews)
```

> This loads all the customers and the associated orders and reviews for each.

[Reference](https://guides.rubyonrails.org/active_record_querying.html#array-of-multiple-associations)<br>
And following paragraphs.

---
General post references:
- [Active Record Basics](https://guides.rubyonrails.org/active_record_basics.html)
- Awesome blog post about [Query Objects in Rails by Thiago](https://thoughtbot.com/blog/a-case-for-query-objects-in-rails) - bookmenrk it for next time you are in scope hell.
