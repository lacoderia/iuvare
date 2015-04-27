FactoryGirl.define do
  factory :question, class: Question do
    association :test, factory: :test
    text "What would you do if you arrived late to a date?"
  end
end
