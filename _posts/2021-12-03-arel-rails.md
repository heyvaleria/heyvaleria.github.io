---
layout: post
author: Valeria
title: "Arel tables"
date: 2021-12-03
categories: rails coding
---
# Arel tables

In a client project we were asked to implement a server-side search to be
filtered in the frontend.

Reasons: many entries are expected and the usual way to load a huge JSON file
to the frontend coming from the serializer would be too heavy once in
production.

The codebase uses interactors and Arel.

My understanding is that Arel is a way to write SQL queries in a syntax that is
a mix between raw SQL, ActiveRecord and its own DSL, really, in the end.

There two major moving parts for this to work.

1) We have a serializer that gets attributes from the database and sends them to
the frontend,

2) Write the (interactors) code to make the queries to the backend.

## 1. Serializer
Let's imagine a recipe book where users have their own profile and post
recipes.

Some attributes are on the object itself, say in the table recipes we have `recipe.name`,
`recipe.cost`.
Other attributes are derived from other associations, for example the author who
entered it as `recipe.user.name` and `recipe.user.location.name` to determine
what region the recipe is from.

The serializer will look something like:
``` rb
module Cookbook
  class RecipeSerializer < ApplicationSerializer
    attributes(
      :name,
      :cost,
      :user_id
    )
    attribute(:author) { object.user.name }
    attribute(:region) { object.user.location.name }
  end
end
```

## 2. Interactors
To get these attributes we need to do a couple of things.
- Write the Arel queries
- Make a `foreign_attributes_scopes.rb` file to be included in your model, to collect these queries.

Include this in your Recipe model:
include ForeignAttributeScopes

### Interactors
Case 1 when the attribute is on our table but we need to format or extract it in a
different way, or extract some other data out of it, to return as end result,
examples are dates ensuring format and time zone, or casting numbers for amounts in decimals etc.
We write raw SQL:


Let us imagine we have the cost for the ingredients expressed in cents.

```rb
module Query
  class FormatCostFromRecipes
    include Interactor

    def call
      context.extract = Arel::Nodes::SqlLiteral.new(
        "CAST((recipes.cost_cents / 100) AS DECIMAL(19,2))"
      )
    end
  end
end
```


Case 2 when we need to make a (left, called OuterJoin in Arel land) join to reach another table, so we
make a join statement, then we access the table and query it:

```rb
module Query
  class JoinsRecipesToUsers
    include Interactor
    include InteractorJoins

    def call
      recipes = Cookbook::Recipe.arel_table
      users = User.arel_table

      context.join = recipes.create_join(
        users,
        recipes.create_on(users[:id].eq(recipes[:user_id])),
        Arel::Nodes::OuterJoin
      )
    end
  end
end
```

Case 3 is when we have case 2 but we need to make multiple joins in order to get
to the table we need. So we make all the necessary joins files like case 1, plus
another file to organize such joins, and query that in the
foreign_attributes_scopes file.

Let's imagine we want to join recipes to users, and then users to the user's
location to get the region the recipe is from. This is to show how to organize
your query, that you had created in case 2 for both recipes to users and users
to locations, assuming you have a foreign key on these tables.

```rb
module Query
  class JoinsRecipesToLocations
    include Interactor::Organizer

    organize(
      JoinsRecipesToUsers,
      JoinsUsersToLocations
    )
  end
end

```

Now we can fill out our foreign_attributes_scopes.rb
```rb
module Cookbook
  class Recipes
    module ForeignAttributeScopes
      extend ActiveSupport::Concern

      ACTIVE_RECORD_JOINS = {
        author: {
          joins: Query::JoinsRecipesToUsers.call.joins,
          identifier: User.arel_table[:name]
        },
        cost: {
          identifier: Query::FormatCostFromRecipe.call.extract
        },
        region: {
          joins: Query::JoinsRecipesToLocations.call.joins,
          identifier: Geography::Locations.arel_table[:name]
        }
      }.freeze

      included do
        include ActiveRecordJoins
      end
    end
  end
end
```

We can also leverage `Alias` if we want to type less, for example
in the code snippet of case 2 we did not want to repeat, maybe in a complex file
that uses it many times, or to extract the alias to a separate definition file
and be able to call it in the various files in the queries, since it will be
heavily used, we could do:

Instead of
``` rb
recipes = Cookbook::Recipe.arel_table
```

Make a new file `alias_recipes.rb`
``` rb
module Query
  class AliasRecipes
    include Interactor

    def call
      context.alias = Cookbook::Recipe.arel_table.alias("recipes")
    end
  end
end
```

And use is in the query as (reference case 2 snippet of code):
``` rb
def call
  recipes = AliasRecipes.call.alias
  users = User.arel_table

[etc etc]
```

## Conclusion
I found it helpful to look at the schema, the serializer, and also using the
rails console to see the SQL output to help me build the queries. Or if I had
a SQL client that worked, building the queries by hand would have been helpful.

How do you test it in real life?
Load the page in the browser and inspect in the
Chrome inspector, in the Network tab the response we are getting from the
controller.

How do you test it with specs?
A request spec to test the response of the controller may be helpful, and a
feature spec, because this is probably a very much end-user driven feature.

You can also read this [beautiful blog
post](https://thoughtbot.com/blog/using-arel-to-compose-sql-queries), I read after I wrote all this.
