FactoryGirl.define do
  factory :invitation, class: Invitation do
    association :user, factory: :user
    recipient_name "recipient name"
    sequence(:recipient_email){ |n| "user-#{n}@whatever.mx" }
    token "token-string"
  end

end
