FactoryGirl.define do
  factory :asset, class: Asset do
    title "Training for test asset"
    description "Description of training where it happened"
    author "Author Name"
    source "source_name.vid"
    purchasable false
    price 0.0
    asset_type "training"
  end
end
