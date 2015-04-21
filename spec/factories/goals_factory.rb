FactoryGirl.define do
  factory :goal, class: Goal do
      association :user, factory: :user
      dream 'To be the best in the world'
      goal 'I want to be the best IUVARE dreamer in the whole world'
      date Time.zone.now
      goal_type 'be'
  end
end
