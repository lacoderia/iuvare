FactoryGirl.define do
  factory :collage, class: Collage do
    association :user, factory: :test
    name "First Collage"
    order 1
  end
end
