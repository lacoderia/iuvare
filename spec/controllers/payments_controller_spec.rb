feature 'PaymentsController' do

  describe 'payment process' do
    context 'user registration testing all payments' do

      let!(:starting_datetime) { Time.zone.parse('01 Jan 2016 13:00:00') }  
      
      before do
        Timecop.freeze(starting_datetime)
      end

      it 'tests error in notification handling' do

         upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")

        #Transaccion no completa
        paypal_ipn_object = {
          item_name: "Compra de KIT",
          custom: User.last.id,
          mc_gross: 1196,
          txn_id: "txn_id_01",
          mc_currency: "MXN",
          payment_status: "Created"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        response = JSON.parse(page.body)
        expect(response['success']).to eql false
        expect(response['error']).to eql "Notificación de pago no marcado como completado."
        expect(page.status_code).to be 500

        #Transaccion sin cantidad correcta
        paypal_ipn_object = {
          item_name: "Compra de KIT",
          custom: User.last.id,
          mc_gross: 1001,
          txn_id: "txn_id_01",
          mc_currency: "MXN",
          payment_status: "Completed"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        response = JSON.parse(page.body)       
        expect(response['success']).to eql false
        expect(response['error']).to eql "La cantidad pagada $ #{1001} por usuario #{User.last.id} no equivale a ningún producto."
        expect(page.status_code).to be 500

      end

      it 'successfully creates user without welcome kit and stops login until payment is completed' do
        upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", iuvare_id: "123456", active: true, xango_rank: "DIOS", password:"xangoxango")
        invitation = Invitation.create(user: upline, recipient_email: "usertest@whatever.mx", token: "token-test-string")
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", iuvare_id: "32423", sponsor_iuvare_id: "123456", placement_iuvare_id: "123456", upline_id: upline.id, kit_bought: false }

        # Validates user creation
        page = register_with_service new_user, invitation.token 
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['access_level']['valid_account']).to eql false
        payment_object = response['result']['access_level']['payment_options'][0]
        expect(payment_object["shipping"]).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['email']).to eql invitation.recipient_email
        expect(response['result']['downline_position']).to eql 1
        logout

        # PAGO DE KIT
        paypal_ipn_object = {
          item_name: "Compra de KIT",
          custom: User.last.id,
          mc_gross: 1196,
          txn_id: "txn_id_01",
          mc_currency: "MXN",
          payment_status: "Completed",
          address_country: "Mexico",
          address_city: "DF",
          address_name: "Romulo Remo",
          address_state: "México",
          address_street: "Torre Blanca 244", 
          address_zip: "08879",
          contact_phone: "343434534",
          first_name: "De Mujer",
          last_name: "Corazón de un Don Juan"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end
        
        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout

        # No puede entrar despues de 3 meses
        three_months_after = starting_datetime + 3.months + 1.minute
        Timecop.travel(three_months_after)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        payment_object = response['result']['access_level']['payment_options'][0]
        expect(payment_object["shipping"]).to be false 
        logout

        # PAGO DE UN MES
        paypal_ipn_object = {
          item_name: "Compra de un mes",
          custom: User.last.id,
          mc_gross: 90,
          txn_id: "txn_id_02",
          mc_currency: "MXN",
          payment_status: "Completed"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout

        # No puede entrar despues de 1 mes (+3 meses por el nuevo precio de 1196) y un minuto
        four_months_after = three_months_after + 1.month
        Timecop.travel(four_months_after + 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        payment_object = response['result']['access_level']['payment_options'][0]
        expect(payment_object["shipping"]).to be false 
        logout
        
        # Quitamos el minuto que invalida los 3 meses (+1 mes por el nuevo precio de 1196) para realizar la compra de los 3 meses
        Timecop.travel(four_months_after)        

        # PAGO DE TRES MESES
        paypal_ipn_object = {
          item_name: "Compra de tres meses",
          custom: User.last.id,
          mc_gross: 220,
          txn_id: "txn_id_04",
          mc_currency: "MXN",
          payment_status: "Completed"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout

         # Puede entrar después de 3 meses (+4 meses por el nuevo precio de 1196) 
        seven_months_after = four_months_after + 3.months
        Timecop.travel(seven_months_after - 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout
        
        # No puede entrar despues de 3 meses (+4 meses por el nuevo precio de 1196) y un minuto
        Timecop.travel(seven_months_after + 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        logout

        # Quitamos el minuto que invalida los 3 meses (+4 meses por el nuevo precio de 1196) para realizar la compra de los 6 meses
        Timecop.travel(seven_months_after)        

        # PAGO DE SEIS MESES
        paypal_ipn_object = {
          item_name: "Compra de cinco meses",
          custom: User.last.id,
          mc_gross: 430,
          txn_id: "txn_id_05",
          mc_currency: "MXN",
          payment_status: "Completed"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout

         # Puede entrar después de 6 meses (+7 meses por el nuevo precio de 1196) 
        thirteen_months_after = seven_months_after + 6.months
        Timecop.travel(thirteen_months_after - 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout
        
        # No puede entrar despues de 6 meses (+7 meses por el nuevo precio de 1196) y un minuto
        Timecop.travel(thirteen_months_after + 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        logout

        # Quitamos el minuto que invalida los 6 meses (+7 meses por el nuevo precio de 1196) para realizar la compra de los 12 meses
        Timecop.travel(thirteen_months_after)
        
        # PAGO DE DOCE MESES
        paypal_ipn_object = {
          item_name: "Compra de doce mes",
          custom: User.last.id,
          mc_gross: 790,
          txn_id: "txn_id_03",
          mc_currency: "MXN",
          payment_status: "Completed"
        }

        with_rack_test_driver do
          page.driver.post "#{ipn_payments_path}.json", paypal_ipn_object
        end

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout

        # Puede entrar después de 12 meses (+13 meses por el nuevo precio de 1196) 
        twenty_five_months_after = thirteen_months_after + 12.months
        Timecop.travel(twenty_five_months_after - 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout
        
        # No puede entrar despues de 12 meses (+13 meses por el nuevo precio de 1196) y un minuto
        Timecop.travel(twenty_five_months_after + 1.minute)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        logout        

      end

    end

  end

end
