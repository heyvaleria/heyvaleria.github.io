---
layout: post
author: Valeria
title: "Rails form helper: fields_for"
date: 2022-01-14
categories: coding rails
---
OK, we have a Rails form, but we need to write an attribute on another model.
`fields_for` comes to the rescue, with a few things to consider.

Let's imagine we have a User model but when we create a new user or edit an
existing one, our form gives us the option to change the emergency contact email
address, which is the Contacts table.
User `has_one` Contact and Contact `belongs_to` the User.

Our form looks like:

```ruby
<%= form_for @user do |user_form| %>
  ...etc
  <%= user_form.text_field :first_name %>
  <%= user_form.fields_for :contact, (user_form.object.contact || Contact.new) do |contact_form| %>
    <label><%= t(".email") %><label>
    <%= contact_form.email_field(:email, value: contact_form.object.email %>
  <% end %>
<% end %>
```

## Explanation
We make a `fields_for` block for the Contact object, and if we are rendering
this form in /edit, we want to edit the `user_form.object.contact` (or `@user`,
or `user`, depending on how we're passing the variable around in the partial),
but the point is that we want to **AVOID** making a new instance of a contact when
we are editing.

If we don't specify it, we will have a new instance of a contact
with all `nil`s except for the email.


If we are rendering `/new` and creating a new user and contact, then
`user_form.object.contact` would return `nil` and therefore we want to make a
`Contact.new`.
**Also note**, we would not see the fields rendering to the markup at all if
contact is `nil`.

We decided to add a label explicitly, and that will make a `label_for` and we
are able to leverage `i18n` as well. This may not be relevant in your case.

Then we have the actual field, and we also add a `value` to show the current contact
email, if present.


## Plus, in the Model and the Controller
In the `user.rb` model we added:

```ruby
accepts_nested_attributes_for(:contact)
```

So that the model will accept those attributes and when we call params in our
`pry`, we now see `contact_attributes` being passed.

**But look!** The params look something like (slight pseudo-code here):

```
user_parameters: {id: 12, name: "foo", contact_attributes: { email: "foo@bar.com", id:
"12" } }
```

In the `users_controller.rb` we added contact email in the params

``` ruby
private

def users_params
 params.require(:user).permit(:name, contact_attributes: [:id, :email])
end
```

This step is **very important**
In the case of a new instance it is not a big deal, but if we are EDITING a
user's contact, we must ensure we add `:id` to the `contact_attributes` params
because otherwise Rails does not know the contact for which user is supposed to
edit.

In the markup we will have a hidden field below email, with the `id` passed in
with the form object submitted.

See second link in references, for `accepts_nested_attributes_for` and
inside the paragraph for `:update_only`.

> For a one-to-one association, this option allows you to specify how nested attributes are going to be used when an associated record already exists. In general, an existing record may either be updated with the new set of attribute values or be replaced by a wholly new record containing those values. By default the :update_only option is false and the nested attributes are used to update the existing record only if they include the record's :id value. Otherwise a new record will be instantiated and used to replace the existing one. However if the :update_only option is true, the nested attributes are used to update the record's attributes always, regardless of whether the :id is present. The option is ignored for collection associations.

Another note, in the create method, we could also use the `build_contact`
method. But not in update, or we would lose its state.

```ruby
def create
  @user = User.new
  @user.contact = build_contact
end
```

### References
[Ruby on Rails guides for fields for helper](https://guides.rubyonrails.org/form_helpers.html#understanding-parameter-naming-conventions-the-fields-for-helper)

[Accepts nested attributes method](https://api.rubyonrails.org/v7.0.1/classes/ActiveRecord/NestedAttributes/ClassMethods.html#method-i-accepts_nested_attributes_for)

[Fields for in API dock](https://apidock.com/rails/v5.2.3/ActionView/Helpers/FormHelper/fields_for)
