FactoryGirl.define do
  factory :historic_asset, class: HistoricAsset do
      
    historic_asset_type "audio"
    name "audio name"
    author 'author name'
    color 'yellow'
    number 'COC33'
    
    trait :audio do
      historic_asset_type "audio"
      name "audio name"
      author 'author name'
      color 'yellow'
      number 'COC33'
    end

    trait :book do
      historic_asset_type "book"
      name "book name"
      author 'author name'
      number '2013-05-02'
    end
  end
end
