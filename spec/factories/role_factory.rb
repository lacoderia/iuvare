FactoryGirl.define do
  factory :role, class: Role do
    name 'user'
  end

  factory :role_premier, parent: :role do
    name 'permier'
  end
  
end

