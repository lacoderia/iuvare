feature 'UsersController' do
  describe 'user services' do

    context 'by_xango_id' do
      let!(:user){ create(:user, xango_id: "12066412") }

      it 'should get user' do
        visit("#{by_xango_id_users_path}.json?xango_id=12066412")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['id']).to eql user.id
        expect(response['result']['xango_id']).to eql "12066412"
        
        visit("#{by_xango_id_users_path}.json?xango_id=12066415")
        response = JSON.parse(page.body)
        expect(response['success']).to be false
        expect(response['error']).to eql "No se encontró usuario con este ID de Xango"

      end
    end

    context 'user downlines' do

      it 'successfully logins, gets all downlines, logs out, invalid gets all downlines' do
        #login 
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down = User.create(first_name: "Mucho", last_name: "Premier", email: "downline@xango.com", xango_id: "654321", iuvare_id: "4321", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id)
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
        #logout
        logout
        #invalid gets all downlines
        visit("/downlines/all.json")
        response2 = JSON.parse(page.body)
        expect(response2['success']).to be false
      end

      it 'successfully logins, gets cycle downlines, logs out, invalid gets cycle downlines' do
        #login 
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", xango_id: "111111", iuvare_id: "111", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 2)
        down2 = User.create(first_name: "Reina", last_name: "Premier", email: "downline2@xango.com", xango_id: "222222", iuvare_id: "222", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 1)
        down3 = User.create(first_name: "Conde", last_name: "Premier", email: "downline3@xango.com", xango_id: "333333", iuvare_id: "333", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 3)
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
        #logout
        logout
        #invalid gets cycle downlines
        visit("/downlines/cycle.json")
        response2 = JSON.parse(page.body)
        expect(response2['success']).to be false
      end

      it 'successfully logins, changes downline position, logs out' do
        #login
        up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        down1 = User.create(first_name: "Rey", last_name: "Premier", email: "downline1@xango.com", xango_id: "111111", iuvare_id: "111", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 2)
        down2 = User.create(first_name: "Reina", last_name: "Premier", email: "downline2@xango.com", xango_id: "222222", iuvare_id: "222", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 1)
        down3 = User.create(first_name: "Conde", last_name: "Premier", email: "downline3@xango.com", xango_id: "333333", iuvare_id: "333", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id, downline_position: 3)
        down4 = User.create(first_name: "Condesa", last_name: "Premier", email: "downline4@xango.com", xango_id: "444444", iuvare_id: "444", active: true, xango_rank: "Premier", password:"xangoxango", upline_id: up.id)
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

    end
  end
end
