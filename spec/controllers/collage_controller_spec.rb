feature 'CollageController' do
  let!(:user){ create(:user) }
  
  describe 'collage user flow' do

    context 'collage_image delete and collage by_user' do
      let!(:collage){ create(:collage, user: user) }
      let!(:collage_image_1){ create(:collage_image, collage: collage, order: 1) }
      let!(:collage_image_2){ create(:collage_image, collage: collage, order: 2) }
      let!(:collage_image_3){ create(:collage_image, collage: collage, order: 3) }
      let!(:collage_image_4){ create(:collage_image, collage: collage, order: 4) }

      it 'gets a collage for user and alters it' do

        login_with_service u = { email: user.email, password: '12345678' }
        
        with_rack_test_driver do
          page.driver.delete "#{collage_images_path}/#{collage_image_2.id}.json" 
        end

        expect(page.status_code).to be 204

        visit "#{by_user_collages_path}.json?user_id=#{user.id}"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        collage_response = response['result']['collages'].first

        expect(collage_response['id']).to be collage.id
        collage_images = collage_response['collage_images']
        expect(collage_images.count).to be 3
        expect(collage_images.first['id']).to be collage_image_1.id
        expect(collage_images.last['id']).to be collage_image_4.id
        
      end

    end

  end

  context 'create_by_user_id' do

    it 'creates a collage from scratch for user' do

      login_with_service u = { email: user.email, password: '12345678' }
      
      visit "#{by_user_collages_path}.json?user_id=#{user.id}"
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']).to be nil

      test_file = "moto.jpg" 
      picture = Rack::Test::UploadedFile.new(Rails.root + "spec/images/#{test_file}", 'image/jpg')
      new_collage_image_request = {picture: picture, order: 1, user_id: user.id}
      with_rack_test_driver do
        page.driver.post "#{create_by_user_id_collage_images_path}.json", new_collage_image_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['picture'].index test_file).not_to be nil

      visit "#{by_user_collages_path}.json?user_id=#{user.id}"
      response = JSON.parse(page.body)
      expect(response['success']).to be true

      collage_response = response['result']['collages'].first
      collage_images = collage_response['collage_images']
      expect(collage_images.count).to be 1
      expect(collage_images.first['picture'].index test_file).not_to be nil
    end

    it 'should throw error' do
      test_file = "moto.jpg" 
      picture = Rack::Test::UploadedFile.new(Rails.root + "spec/images/#{test_file}", 'image/jpg')
      new_collage_image_request = {picture: picture, order: 1, user_id: 1000}
      
      login_with_service u = { email: user.email, password: '12345678' }
      
      with_rack_test_driver do
        page.driver.post "#{create_by_user_id_collage_images_path}.json", new_collage_image_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be false 
    end
    
  end

end
