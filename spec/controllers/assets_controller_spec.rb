feature 'AssetsController' do
  let!(:test){ create(:test, name: "Prueba test") }
  let!(:asset){ create(:asset, title: "Search Title", test: test) }
  let!(:other_asset){ create(:asset) }
  
  describe 'asset associations' do

    context 'by_asset_type' do

      it 'has correct associations' do
        visit "#{by_asset_type_assets_path}.json?asset_type=#{asset.asset_type}"

        response = JSON.parse(page.body)
        expect(response['success']).to be true

        assets = response['result']['assets']
        expect(assets.count).to eql 2
        expect(assets.first['id']).to eql asset.id
        expect(assets.first['test']['name']).to eql "Prueba test"
        expect(assets.last['id']).to eql other_asset.id
        expect(assets.last['test']).to be nil
      end
      
      it 'responds with empty resultset' do
        visit "#{by_asset_type_assets_path}.json?asset_type=audio"
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to be nil
      end

    end

    context 'by_keyword_and_asset_type' do

      let!(:asset_description){ create(:asset, description: "Search DESCRIPTION") }
      let!(:asset_author){ create(:asset, author: "Search author") }
    
      it 'has correct associations' do
        visit "#{by_keyword_and_asset_type_assets_path}.json?asset_type=#{asset.asset_type}&keyword=#{'TITLE'}"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        assets = response['result']['assets']
        expect(assets.count).to eql 1
        expect(assets.first['id']).to eql asset.id
        expect(assets.first['stream_url']).to eql "/stream?asset_type=#{asset.asset_type}&source=#{asset.source}"
        expect(assets.first['test']['name']).to eql "Prueba test"

        visit "#{by_keyword_and_asset_type_assets_path}.json?asset_type=#{asset.asset_type}&keyword=#{'description'}"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        assets = response['result']['assets']
        expect(assets.count).to eql 1
        expect(assets.first['id']).to eql asset_description.id

        visit "#{by_keyword_and_asset_type_assets_path}.json?asset_type=#{asset.asset_type}&keyword=#{'Author'}"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        assets = response['result']['assets']
        expect(assets.count).to eql 1
        expect(assets.first['id']).to eql asset_author.id

        visit "#{by_keyword_and_asset_type_assets_path}.json?asset_type=#{asset.asset_type}&keyword=#{'search'}"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        assets = response['result']['assets']
        expect(assets.count).to eql 3

      end

      it 'responds with empty resultset' do
        visit "#{by_asset_type_assets_path}.json?asset_type=audio&keyword=#{'audio'}"
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to be nil
      end

    end
    
  end
  
  describe 'asset type plan and tests relationship' do
 	  let!(:test_plan){ create(:test, name: "Plan test", code: "plan") }
	  let!(:asset_plan_jorge){ create(:asset, title: "Plan Jorge", test: test_plan, asset_type: "plan") }
	  let!(:asset_plan_circe){ create(:asset, title: "Plan Circe", test: test_plan, asset_type: "plan") }
	  
  	context 'correct relationship' do
  		it 'should return same test from diferent plans' do
  			visit "#{by_asset_type_assets_path}.json?asset_type=plan"

        response = JSON.parse(page.body)
        expect(response['success']).to be true

        assets = response['result']['assets']
        expect(assets.count).to eql 2
        expect(assets.first['test']['id']).to eql test_plan.id
        expect(assets.second['test']['id']).to eql test_plan.id
  		end
  	end
  end

end
