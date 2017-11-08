feature 'RegistrationsController' do
  
  let!(:user){create(:user, iuvare_id: "12066412")}
  let!(:invitation){create(:invitation, user: user)}

  describe 'registration process' do
    context 'user creation' do 
      
      OLD_FREE_MONTHS = 1
      NEW_FREE_MONTHS = 3  

      it 'successfully creates user, logout, valid and invalid login, existing and non-existing session' do
        upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", iuvare_id: "123456", active: true, xango_rank: "DIOS", password:"xangoxango")
        invitation = Invitation.create(user: upline, recipient_email: "usertest@whatever.mx", token: "token-test-string")
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_iuvare_id: "123456", placement_iuvare_id: "123456", upline_id: upline.id, kit_bought: true }
        
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

      it 'validates free months for new users' do

        upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", iuvare_id: "123456", active: true, xango_rank: "DIOS", password:"xangoxango")
        invitation = Invitation.create(user: upline, recipient_email: "usertest@whatever.mx", token: "token-test-string")
        invitation_new_kit = Invitation.create(user: upline, recipient_email: "usertest02@whatever.mx", token: "token-test-string-02")

        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_iuvare_id: "123456", placement_iuvare_id: "123456", upline_id: upline.id, kit_bought: true }       
        new_user_new_kit = { first_name: "new", last_name: "kit", email: invitation_new_kit.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "36487", sponsor_iuvare_id: "123456", placement_iuvare_id: "123456", upline_id: upline.id, kit_bought: true }
        # New user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        expect(response['result']['downline_position']).to eql 1
        
        # Validates 1 month for old users
        one_month_free_expiration_date = DateTime.parse(response['result']['payment_expiration']).to_i
        one_month_validated_free_expiration_date = (User.find(response['result']['id']).created_at + OLD_FREE_MONTHS.months).to_i
        expect(one_month_free_expiration_date).to eql one_month_validated_free_expiration_date
        logout

        # New user with new kit creation
        page = register_with_service new_user_new_kit, invitation_new_kit.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql true
        expect(response['result']['first_name']).to eql "new"
        expect(response['result']['email']).to eql invitation_new_kit.recipient_email
        expect(response['result']['downline_position']).to eql 2
        
        # Validates 3 month for old users
        three_month_free_expiration_date = DateTime.parse(response['result']['payment_expiration']).to_i
        three_month_validated_free_expiration_date = (User.find(response['result']['id']).created_at + NEW_FREE_MONTHS.months).to_i
        expect(three_month_free_expiration_date).to eql three_month_validated_free_expiration_date
        logout

      end

      it 'checks for error on duplicate users' do
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_iuvare_id: "12066412", placement_iuvare_id: "12066412"  }
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

        # CHECK FOR DUPLICATE IUVARE ID
        new_user = { first_name: "test", last_name: "user", email: "email@email.com", password: "12345678", password_confirmation: "12345678",  iuvare_id: "34000", sponsor_iuvare_id: "12066413", placement_iuvare_id: "12066413"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Tu ID de IUVARE ya está siendo usado por alguien más, por favor escríbenos a contacto@iuvare.mx"

      end

      it 'checks for error on an invitation tried to be used twice' do
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_iuvare_id: "12066412", placement_iuvare_id: "12066412"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        logout
        another_user = { first_name: "test", last_name: "user", email: "another_user@test.com", password: "12345678", password_confirmation: "12345678", iuvare_id: "34001", sponsor_iuvare_id: "12066412", placement_iuvare_id: "12066412"  }
        page = register_with_service another_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Necesitas una invitación válida para poderte registrar. Solicítala a tu upline o premier."
      end

      it 'checks for error on a registration with the same Xango ID than the one that is inviting' do
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "12066412", sponsor_iuvare_id: "12066412", placement_iuvare_id: "12066413"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Tu ID de IUVARE no puede ser igual que el de tu auspiciador." 

        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678",  iuvare_id: "12066412", sponsor_iuvare_id: "12066413", placement_iuvare_id: "12066412"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Tu ID de IUVARE no puede ser igual que el de tu auspiciador."

      end
      
      it 'checks for error on a registration with sponsor ID different than the one that is inviting' do
         new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_xango_id: "12066413", placement_xango_id: "12066413"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "El ID IUVARE en patrocinio o colocación debe ser el de la persona que te mandó la invitación."

        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "34000", sponsor_iuvare_id: "12066412", placement_iuvare_id: "12066413"  }
        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true 
      end

    end
  end

end
