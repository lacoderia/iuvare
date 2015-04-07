feature 'UsersController' do
  describe 'user services' do
    context 'user downlines' do

      it 'successfully logins, gets all downlines, logs out, invalid gets all downlines' do
          #login 
          up = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
          down = User.create(first_name: "Perro", last_name: "Premier", email: "downline@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango", upline_id: up.id)
          page = login_with_service user = { email: "diospremier@xango.com", password: 'xangoxango' }
          response = JSON.parse(page.body)
          expect(response['success']).to be true 
          #gets all downlines
          visit("/downlines/all.json")
          response1 = JSON.parse(page.body)
          expect(response1['success']).to be true
          expect(response1['result'].length).to eql 1 
          expect(response1['result'][0]['first_name']).to eql "Perro"
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
          down1 = User.create(first_name: "Perro", last_name: "Premier", email: "downline1@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango", upline_id: up.id, downline_position: 2)
          down2 = User.create(first_name: "Gato", last_name: "Premier", email: "downline2@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango", upline_id: up.id, downline_position: 1)
          down3 = User.create(first_name: "Culito", last_name: "Premier", email: "downline3@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango", upline_id: up.id)
          page = login_with_service user = { email: "diospremier@xango.com", password: 'xangoxango' }
          response = JSON.parse(page.body)
          expect(response['success']).to be true 
          #gets cycle downlines
          visit("/downlines/cycle.json")
          response1 = JSON.parse(page.body)
          expect(response1['success']).to be true
          expect(response1['result'].length).to eql 2
          expect(response1['result'][0]['first_name']).to eql "Gato"
          expect(response1['result'][0]['upline_id']).to eql up.id
          #logout
          logout
          #invalid gets cycle downlines
          visit("/downlines/cycle.json")
          response2 = JSON.parse(page.body)
          expect(response2['success']).to be false
      end
    end
  end
end