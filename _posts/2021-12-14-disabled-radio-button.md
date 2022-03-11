---
layout: post
author: Valeria
title: "Disabled radio button"
date: 2021-12-14
categories: rails coding
---
# Disabled radio button

If you have a radio button and it is marked as `disabled: true` when you submit
the form that param will not be included in the params with the existing
selection, and it will be an empty string.

One solution is to set a hidden field for that attribute with the existing
value, to trigger when the condition of being disabled is true.

```ruby
<%= form.radio_button_tag :container, "cone", checked: false, disabled:
 icrecream.unavailable? %>
<%= form.radio_button_tag :container, "cup", checked: false, disabled:
 icrecream.unavailable? %>

<% if icecream.unavailable? %>
 <%= form.hidden_field :container, value: icecream.type %>
<% end %>

```
The example is not great, but let's say we want to preserve a previous container
choice and prevent it from being changed for some reason.
