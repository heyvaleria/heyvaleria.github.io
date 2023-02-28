---
layout: post
author: Valeria
title: "Capybara session"
date: 2022-05-02
categories: coding rspec
---

In a Rails RSpec that uses Capybara, we were visiting a page, clicking some stuff,
making assertions and the click "complete" at the very end.

In the spec right before clicking "complete", we were supposed to go to a different
path and check that some UI had changed contextually, as different users would be
accessing those different views and get real-time results.

The great solution that [Justin](https://github.com/jutonz) recommended was to use
a separate Capybara session to go check in the other view was we were expecting
was happening.
It was super neat and this is how it worked:

```ruby
describe "my cool feature" do
  it "checks the result on both pages" do
    # first we set up the Session:

    # We can specify the driver or more agnostically if we want to
    # be sure we are using the same driver that both our system and
    # the CI/CD is using for example, we can refer to the current_driver.
    # This could be :chrome, :selenium, etc.:
    driver = Capybara.current_driver

    # This an instance of our application that we are running in the
    # test suite, that we arbitrarily name rack_application:
    rack_application = Capybara.app

    # Instantiate the new session passing the driver and the app:
    new_awesome_session = Capybara::Session.new(driver, rack_application)

    visit main_page_path

    # Here we start the session for the other page and call the `.visit`
    # method from Capybara session and have it open in another window:
    new_awesome_session.visit(the_other_page_path)

    # We start clicking around in the first page we are looking at,
    # `main_page_path`:
    within "#some-part-of-this-page" do
      click_on blue_button
      click_on green_button
      expect(page).to have content("almost done")
    end

    # Then we call the `.using_session`(*) method and its block to
    # check the other page:
    using_session(new_awesome_session) do
      within "#some-part-of-that-page" do
        expect(page).to have_content("I know someone clicked
          the blue and green buttons elsewhere")
      end
    end

    # Finally we want to complete our first chore and click the button:
    within "#some-part-of-this-page" do
      click_on complete_button
      expect(page).to have_content("task complete")
    end
  end
end
```

Documentation [Capybara Session](https://www.rubydoc.info/gems/capybara/Capybara/Session)

(*) [`using_session` method](https://www.rubydoc.info/gems/capybara/Capybara.using_session)
