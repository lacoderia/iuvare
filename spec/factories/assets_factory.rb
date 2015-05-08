FactoryGirl.define do
  factory :asset, class: Asset do
    title "Training for test asset"
    description "Where training happened"
    author "Bejoview Heinkudez"
    source "source_name"
    purchasable false
    price 0.0
    asset_type "training"

    trait :plan do
      asset_type "plan"
      association :test, :for_plan, factory: :test
    end
  end
end
