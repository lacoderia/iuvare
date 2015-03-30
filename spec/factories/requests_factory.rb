FactoryGirl.define do
  factory :request, class: Request do
    association :user, factory: :user
    source_name "Juanito Bodoque"
    sequence(:source_email){ |n| "user-#{n}@iuvare.mx" }
    source_text "Me quiero registrar y soy de MAP"
    visible true
    status 'pending'
  end

end
