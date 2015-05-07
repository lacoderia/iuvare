FactoryGirl.define do
  factory :answer, class: Answer do
    association :question, factory: :question
    answer_type "yellow"
    trait :for_plan do
      sequence(:answer_type) {|n| n}
      sequence(:text){|n| "texto-random#{n}" }
    end
  end
end
