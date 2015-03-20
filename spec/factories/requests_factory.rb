FactoryGirl.define do
  factory :request, class: Request do
    association :user, factory: :user
    source_name "source name"
    sequence(:source_email){ |n| "user-#{n}@iuvare.mx" }
    source_text "source text"
    visible true
    status 'pending'
  end

end
