feature 'HistoricAssetsController' do
  
  let!(:user){ create(:user) }
  let!(:historic_asset_books){create(:historic_asset, :book)}
  let!(:historic_asset_audios){create(:historic_asset, :audio)}

  describe 'historic_assets' do

    context 'by_type' do

      it 'should get audios' do
        
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_type_historic_assets_path}.json?historic_asset_type=audio"
        
        response = JSON.parse(page.body)
        #expect(response['success']).to be true
        #expect(response['result'][0]['description']).to eql "audios list"

      end
      
      it 'should get books' do

        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_type_historic_assets_path}.json?historic_asset_type=book"
        
        response = JSON.parse(page.body)
        #expect(response['success']).to be true
        #expect(response['result'][0]['description']).to eql "books list"

      end

      it 'should get no assets' do

        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_type_historic_assets_path}.json"
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to eql nil

      end

    end
    
  end

end
