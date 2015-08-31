FactoryGirl.define do
  factory :historic_asset, class: HistoricAsset do
    description "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    historic_asset_type "audio"
    
    trait :audio do
      historic_asset_type "audio"
      description "audios list"
    end

    trait :book do
      historic_asset_type "book"
      description "books list"
    end
  end
end
