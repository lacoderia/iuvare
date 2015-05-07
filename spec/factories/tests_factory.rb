FactoryGirl.define do
  factory :test, class: Test do
    name "Test de personalidad"
    test_type "percentage"
    code "color"
    trait :for_plan do
      name "Que tan interesado estás?"
      code nil
      test_type "multiple"
      after(:create) do |test, evaluator|
        create_list(:question, 2, :for_plan, test: test)
      end
    end
  end
end
