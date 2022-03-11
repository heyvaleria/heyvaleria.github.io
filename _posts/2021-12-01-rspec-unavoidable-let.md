---
layout: post
author: Valeria
title: "Unavoidable let"
date: 2021-12-01
categories: coding rspec
---
# Unavoidable `let`

While pairing with [Steph](https://github.com/SViccari), who was helping me improve a spec file, I was asking
how I could get rid of the top level `let`.

The file before was:

``` rb
describe FooSerializer do
  context "foo serializer something something" do
    let(:model) { FactoryBot.create(:foo, :with_bar_trait) }

    subject { described_class.new(model) }

    it_behaves_like "a serialized model with status"

    it "has a name attribute" do
      expect(subject.attributes[:name]).to eq(model.name)
    end

    it "has a phone attribute" do
      expect(subject.attributes[:phone]).to eq(model.phone)
    end

    [etc etc for many attributes]
  end
end
```

After refactoring it looked like this:

``` rb
describe FooSerializer do
  it_behaves_like "a serialized model with status" do
    let(:model) { FactoryBot.build(:foo, :with_bar_trait) }
    subject { described_class.new(model) }
  end

  it "has foo attributes" do
    model = FactoryBot.build(:foo, :with_bar_trait)
    subject = described_class.new(model)

    expect(subject.attributes[:name]).to eq(model.name)
    expect(subject.attributes[:phone]).to eq(model.phone)
    [etc etc all the attributes grouped here]
  end
end
```

1) Grouping the long list of attributes was beneficial and we could call the
model only once in the `it`.

2) We successfully used `build` instead of `create` everywhere in the file.

3) The top level let was unavoidable because `it_behaves_like`, which came from the
`shared_examples`, needs to have the let specified when passed as a block.

From [Stack
Overflow](https://stackoverflow.com/questions/48588739/rspec-how-to-pass-a-let-variable-as-a-parameter-to-shared-examples/48598876):

```rb
let(:data) { "saved data" }

shared_examples "saves data to right place" do
  it { expect(right_place.data).to eq data }
end

context "when something it saves to one place" do
  it_behaves_like "saves data to right place" do
    let(:right_place) { create(:place) }
  end
end

context "when whatever it saves to other place" do
  it_behaves_like "saves data to right place" do
    let(:right_place) { create(:place) }
  end
end
```
