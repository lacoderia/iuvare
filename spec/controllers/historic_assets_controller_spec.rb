feature 'HistoricAssetsController' do
  
  let!(:user){ create(:user) }
  let!(:historic_asset_audios_1){create(:historic_asset, :audio, created_at: Time.zone.now, number: "21")}
  let!(:historic_asset_audios_2){create(:historic_asset, :audio, created_at: Time.zone.now + 1.minute, number: "22")}


  let!(:historic_asset_books_1){create(:historic_asset, :book, created_at: Time.zone.now, number: "21")}
  let!(:historic_asset_books_2){create(:historic_asset, :book, created_at: Time.zone.now + 1.minute, number: "22")}

  describe 'historic_assets' do

    context 'by_type' do

      it 'should get audios' do
        
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_type_historic_assets_path}.json?historic_asset_type=audio"
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        
        expect(response['result'][0]['id']).to eql historic_asset_audios_2.id 
        expect(response['result'][1]['id']).to eql historic_asset_audios_1.id 

      end
      
      it 'should get books' do

        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{by_type_historic_assets_path}.json?historic_asset_type=book"
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        
        expect(response['result'][0]['id']).to eql historic_asset_books_2.id 
        expect(response['result'][1]['id']).to eql historic_asset_books_1.id 

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
