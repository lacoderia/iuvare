FactoryGirl.define do
  factory :user, class: User do
    sequence(:email){ |n| "user-#{n}@iuvare.mx" }
    first_name 'Test'
    last_name 'User'
    password '12345678'
    roles {[FactoryGirl.create(:role)]}
  end

  factory :premier, parent: :user do
    roles {[FactoryGirl.create(:role_premier)]}
  end

  factory :admin, class: AdminUser do
    sequence(:email){ |n| "admin-#{n}@admin.mx" }
    password '12345678'
  end
end
