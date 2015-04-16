feature 'PasswordsController' do

  let!(:user) { create(:user) }

  context 'Password recovery and change' do

    it 'should send the password recovery instructions' do
      password_recovery_request = { utf8: 'V', user: { email: user.email } }
      page1 = nil
      with_rack_test_driver do
        page1 = page.driver.post "/users/password.json", password_recovery_request
      end
      response = JSON.parse(page1.body)
      token = response['result']['token']
      expect(response['success']).to be true
      expect(token.length).to be > 1
      
      
      old_password = user.password
      new_password = "10002000"
      password_reset_request = { utf8: 'V', user: { reset_password_token: token, password: new_password, password_confirmation: new_password } }
      page2 = nil
      with_rack_test_driver do
        page2 = page.driver.put "/users/password.json", password_reset_request
      end
      response = JSON.parse(page2.body)
      expect(response['success']).to be true

      user = User.first
      expect(user.valid_password?(new_password)).to be true
      expect(user.valid_password?(old_password)).to be false

    end

  end

end
