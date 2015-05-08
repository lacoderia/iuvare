FactoryGirl.define do
  factory :question, class: Question do
    association :test, factory: :test
    text "What would you do if you arrived late to a date?"
    trait :with_answers do
      after(:create) do |question, evaluator|
        create_list(:answer, 2, question: question)
      end
    end
    trait :for_plan do
      text "Que tanto te interesa?"
      after(:create) do |question, evaluator|
        create_list(:answer, 2, :for_plan, question: question)
      end
    end

  end
end
