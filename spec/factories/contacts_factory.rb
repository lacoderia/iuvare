FactoryGirl.define do
  factory :contact, class: Contact do
    association :user, factory: :user
    name "Alberto"
    sequence(:email){ |n| "contact-#{n}@whatever.mx" }
    phone "66666666"
    description "Vive en el DF"
  end
end
