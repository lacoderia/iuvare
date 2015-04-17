FactoryGirl.define do
  factory :user, class: User do
    sequence(:email){ |n| "user-#{n}@iuvare.mx" }
    first_name 'Test'
    last_name 'User'
    password '12345678'
    roles {[FactoryGirl.create(:role)]}
  end

  factory :premier, class: Premier do
    sequence(:email){ |n| "premier-#{n}@iuvare.mx" }
    first_name 'Premier'
    last_name 'User'
    password '12345678'
    roles {[FactoryGirl.create(:role_premier)]}
  end

end
