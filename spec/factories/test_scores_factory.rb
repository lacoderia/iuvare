FactoryGirl.define do
  factory :test_score, class: TestScore do
    association :user, factory: :user
    association :test, factory: :test
    score 80.0
    description "yellow"
  end
end
