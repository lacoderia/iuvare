feature 'AssetsController' do
  let!(:asset){ create(:asset, title: "Search for me") }
  let!(:test){ create(:test, asset: asset) }

  describe 'asset associations' do

    it 'has correct associations' do
      #visit "#{by_asset_type_assets_path}.json?asset_type=#{asset.asset_type}"

      visit "#{by_keyword_and_asset_type_assets_path}.json?asset_type=#{asset.asset_type}&keyword=#{'search'}"
      response = JSON.parse(page.body)
    end
    
  end

end
