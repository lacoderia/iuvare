feature 'SessionsController' do

  let!(:active_user){create(:user, iuvare_id: "12066413")}
  let!(:inactive_user){create(:user, :inactive, iuvare_id: "12066412")}

  describe 'login with session process' do
    context 'session creation' do 
      
      it 'validates access for active users' do

        page = login_with_service user = { email: active_user[:email], password: "12345678" }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql true 
        logout

      end

      it 'validates no access for inactive users' do

        page = login_with_service user = { email: inactive_user[:email], password: "12345678" }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql false
        expect(response['result']['access_level']['message']).to eql "Tu acceso a la página ha sido suspendido." 
        logout

      end

    end
  end

end
