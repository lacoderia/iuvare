FactoryGirl.define do
  factory :collage_image, class: CollageImage do
    association :collage, factory: :collage
    picture string
    order 1    
  end
end
