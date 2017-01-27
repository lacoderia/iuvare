feature 'UsersController' do
  describe 'user services' do

    context 'by_iuvare_id' do
      let!(:user){ create(:user, iuvare_id: "12066412") }

      it 'should get user' do
        visit("#{by_iuvare_id_users_path}.json?iuvare_id=12066412")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['id']).to eql user.id
        expect(response['result']['iuvare_id']).to eql "12066412"
        
        visit("#{by_iuvare_id_users_path}.json?iuvare_id=12066415")
        response = JSON.parse(page.body)
        expect(response['success']).to be false
        expect(response['error']).to eql "No se encontró usuario con este ID de IUVARE"
      end
    end

    context 'user update' do
      let!(:user){ create(:user, iuvare_id: '12066412', first_name: "Ricardo") }
      let!(:user_with_iuvare_id){ create(:user, iuvare_id: "123123", first_name: "Benja") }

      it 'should update user' do

        visit("#{by_iuvare_id_users_path}.json?iuvare_id=12066412")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['id']).to eql user.id
        expect(response['result']['picture']).to eql "" 

        login_with_service u = { email: user.email, password: '12345678' }
        
        test_file = "moto.jpg" 
        picture = Rack::Test::UploadedFile.new(Rails.root + "spec/images/#{test_file}", 'image/jpg')
        update_user_request = {user:{first_name: "Arturo", picture: picture, password: 'ABCDEFG123', password_confirmation: 'ABCDEFG123'} }
        with_rack_test_driver do
          page.driver.put "#{users_path}/#{user.id}.json", update_user_request 
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['picture'].index test_file).not_to be nil
        expect(response['result']['first_name']).to eql "Arturo"
        logout

        page = login_with_service updated_user = { email: user.email, password: 'ABCDEFG123' }
        response = JSON.parse(page.body)
        expect(response['success']).to be true 

        #Error, el password modificado no es igual
        update_user_request = {user:{password: 'ABCDEFG1234', password_confirmation: 'ABCDEFG12345'} }
        with_rack_test_driver do
          page.driver.put "#{users_path}/#{user.id}.json", update_user_request 
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false

        #Error, el iuvare_id ya está siendo usado por otra persona
        update_user_request = {user:{iuvare_id: '123123'} }
        with_rack_test_driver do
          page.driver.put "#{users_path}/#{user.id}.json", update_user_request 
        end
        response = JSON.parse(page.body)
        expect(response['error']).to eql "Tu ID de IUVARE ya está siendo usado por alguien más, por favor escríbenos a contacto@iuvare.mx"
        expect(response['success']).to be false
        
      end

    end

    context 'progress' do
      
      let!(:user){create(:user, iuvare_id: "12066412", first_name: "Ricardo")}
      let!(:contact_1){create(:contact, user: user, status: "to_invite")}
      let!(:contact_2){create(:contact, user: user, status: "to_invite")}
      let!(:contact_3){create(:contact, user: user, status: "contacted")}
      let!(:contact_4){create(:contact, user: user, status: "contacted")}
      let!(:contact_5){create(:contact, user: user, status: "to_close")}
      let!(:contact_6){create(:contact, user: user, status: "to_close")}
      let!(:contact_7){create(:contact, user: user, status: "to_register")}
      let!(:contact_8){create(:contact, user: user, status: "to_register")}
      let!(:contact_9){create(:contact, user: user, status: "registered")}
      let!(:contact_10){create(:contact, user: user, status: "registered")}
      let!(:contact_11){create(:contact, user: user, status: "ruled_out")}
      let!(:contact_12){create(:contact, user: user, status: "ruled_out")}

      it 'sucsessfully counts the funnel progress' do
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{progress_users_path}.json"
        response = JSON.parse(page.body)
        funnel = response['result']
        expect(funnel["to_invite"]).to eql 2 
        expect(funnel["contacted"]).to eql 2
        expect(funnel["to_close"]).to eql 2
        expect(funnel["to_register"]).to eql 2
        expect(funnel["registered"]).to eql 2

        contact_3.rule_out!
        contact_4.watch_video!
        contact_8.register!
        contact_12.start_over!

        visit "#{progress_users_path}.json"
        response = JSON.parse(page.body)
        funnel = response['result']
        expect(funnel["to_invite"]).to eql 3
        expect(funnel["contacted"]).to eql 0
        expect(funnel["to_close"]).to eql 3
        expect(funnel["to_register"]).to eql 1
        expect(funnel["registered"]).to eql 3
        
      end
    end

    context 'user deletion' do

      it 'should not allow an upline with downlines to be deleted' do
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", iuvare_id: "111", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 2)
        expect{ up.destroy }.to raise_error(ActiveRecord::InvalidForeignKey)
      end

    end

    context 'user downlines' do

      it 'successfully logins, gets all downlines, logs out, invalid gets all downlines' do
        #login 
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down = User.create(first_name: "Mucho", last_name: "Premier", email: "downline@xango.com", iuvare_id: "4321", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id)
        page = login_with_service user = { email: "diospremier@xango.com", password: 'xangoxango' }
        response = JSON.parse(page.body)
        expect(response['success']).to be true 
        #gets all downlines
        visit("/downlines/all.json")
        response1 = JSON.parse(page.body)
        expect(response1['success']).to be true
        expect(response1['result'].length).to eql 1 
        expect(response1['result'][0]['first_name']).to eql "Mucho"
        expect(response1['result'][0]['upline_id']).to eql up.id
        expect(response1['result'][0]['picture']).to eql ""
        #logout
        logout
        
        #invalid gets all downlines
        begin
          visit("/downlines/all.json")
        rescue Exception => e
          expect(e.message).to eql "You are not authorized to access this page."
        end
      end

      it 'successfully logins, gets cycle downlines, logs out, invalid gets cycle downlines' do
        #login 
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", iuvare_id: "1234", active: true, password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", iuvare_id: "111", active: true, password:"xangoxango", upline_id: up.id, downline_position: 2)
        down2 = User.create(first_name: "Reina", last_name: "Premier", email: "downline2@xango.com", iuvare_id: "222", active: true, password:"xangoxango", upline_id: up.id, downline_position: 1)
        down3 = User.create(first_name: "Conde", last_name: "Premier", email: "downline3@xango.com", iuvare_id: "333", active: true, password:"xangoxango", upline_id: up.id, downline_position: 3)
        page = login_with_service user = { email: "diospremier@xango.com", password: 'xangoxango' }
        response = JSON.parse(page.body)
        expect(response['success']).to be true 
        #gets cycle downlines
        visit("/downlines/cycle.json")
        response1 = JSON.parse(page.body)
        expect(response1['success']).to be true
        expect(response1['result'].length).to eql 3
        expect(response1['result'][0]['first_name']).to eql "Reina"
        expect(response1['result'][0]['upline_id']).to eql up.id
        expect(response1['result'][0]['picture']).to eql ""
        #logout
        logout

        #invalid gets cycle downlines
        begin
          visit("/downlines/cycle.json")
        rescue Exception => e
          expect(e.message).to eql "You are not authorized to access this page."
        end

      end

      it 'successfully logins, changes downline position, logs out' do
        #login
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", iuvare_id: "111", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 2)
        down2 = User.create(first_name: "Reina", last_name: "Premier", email: "downline2@xango.com", iuvare_id: "222", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 1)
        down3 = User.create(first_name: "Conde", last_name: "Premier", email: "downline3@xango.com", iuvare_id: "333", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 3)
        down4 = User.create(first_name: "Condesa", last_name: "Premier", email: "downline4@xango.com", iuvare_id: "444", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id)
        page = login_with_service user = { email: "diospremier@xango.com", password: 'xangoxango' }
        response = JSON.parse(page.body)
        expect(response['success']).to be true 
        #gets cycle downlines
        with_rack_test_driver do
          page.driver.post "/downlines/#{down4.id}/change_position.json", { position: 1}
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['downline_position']).to eql 1
      end

      it 'errors because user is not logged in' do
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", iuvare_id: "111", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 2)
        down2 = User.create(first_name: "Reina", last_name: "Premier", email: "downline2@xango.com", iuvare_id: "222", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 1)
        down3 = User.create(first_name: "Conde", last_name: "Premier", email: "downline3@xango.com", iuvare_id: "333", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 3)
        down4 = User.create(first_name: "Condesa", last_name: "Premier", email: "downline4@xango.com", iuvare_id: "444", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id)
        
        begin
          with_rack_test_driver do
            page.driver.post "/downlines/#{down4.id}/change_position.json", { position: 1}
          end
        rescue Exception => e
          expect(e.message).to eql "You are not authorized to access this page."
        end

      end

    end
  end
end
