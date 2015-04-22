FactoryGirl.define do
  factory :answer, class: Answer do
    association :question, factory: :question
    answer_type "yellow"
  end
end
