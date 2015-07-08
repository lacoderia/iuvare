feature 'RegistrationsController' do
  
  let!(:invitation) { create(:invitation) }
  
  describe 'registration process' do
    context 'user creation' do 

      it 'successfully creates user, logout, valid and invalid login, existing and non-existing session' do
        upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", xango_id: "12066488", iuvare_id: "7665", sponsor_xango_id: "123456", placement_xango_id: "123456", upline_id: upline.id, kit_bought: true }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        expect(response['result']['downline_position']).to eql 1
        logout
        
        page = login_with_service user = { email: new_user[:email], password: 'invalidpassword' }
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "El correo electrónico o la contraseña son incorrectos."
        page = get_session 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "No has iniciado sesión."

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        page = get_session 
        response = JSON.parse(page.body)
        expect(response['success']).to be true 
        expect(response['result']['first_name']).to eql "test"
      end

      it 'checks for error on duplicate users' do
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", xango_id: "12066488", iuvare_id: "7665", sponsor_xango_id: "12066412", placement_xango_id: "12066412"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        logout
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Ya existe un usuario registrado con ese correo electrónico."
      end

      it 'checks for error on an invitation tried to be used twice' do
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", xango_id: "12066488", iuvare_id: "7665", sponsor_xango_id: "12066412", placement_xango_id: "12066412"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        logout
        another_user = { first_name: "test", last_name: "user", email: "another_user@test.com", password: "12345678", password_confirmation: "12345678", xango_id: "12066488", iuvare_id: "7665", sponsor_xango_id: "12066412", placement_xango_id: "12066412"  }
        page = register_with_service another_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Necesitas una invitación válida para poderte registrar. Solicítala a tu upline o premier."
      end

    end
  end

end
