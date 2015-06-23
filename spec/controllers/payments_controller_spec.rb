feature 'PaymentsController' do

  let!(:invitation) { create(:invitation) }

  describe 'payment process' do
    context 'user registration testing all payments' do

      let!(:starting_datetime) { Time.zone.parse('01 Jan 2015 13:00:00') }  
      
      before do
        Timecop.freeze(starting_datetime)
      end

      it 'tests error in notification handling' do

         upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")

        #Transaccion no completa
        paypal_ipn_object = {
          item_name: "Compra de KIT",
          custom: User.last.id,
          mc_gross: 1000,
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
        upline = User.create(first_name: "Dios", last_name: "Premier", email: "dios@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango")
        new_user = { first_name: "test", last_name: "user", email: invitation.recipient_email, password: "12345678", password_confirmation: "12345678", xango_id: "12066488", sponsor_xango_id: "123456", placement_xango_id: "123456", upline_id: upline.id, kit_bought: false }

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
          mc_gross: 1000,
          txn_id: "txn_id_01",
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

        # No puede entrar despues de 2 meses
        two_months_after = starting_datetime + 2.months + 1.minute
        Timecop.travel(two_months_after)

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

        # No puede entrar despues de 1 mes y un minuto
        three_months_after = two_months_after + 1.month + 1.minute
        Timecop.travel(three_months_after)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql false
        payment_object = response['result']['access_level']['payment_options'][0]
        expect(payment_object["shipping"]).to be false 
        logout        

        # PAGO DE DOCE MESES
        paypal_ipn_object = {
          item_name: "Compra de doce mes",
          custom: User.last.id,
          mc_gross: 900,
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

        # Puede entrar después de 12 meses
        fifteen_months_after = three_months_after + 12.months
        Timecop.travel(fifteen_months_after)

        page = login_with_service user = { email: new_user[:email], password: new_user[:password] }
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['first_name']).to eql "test"
        expect(response['result']['access_level']['valid_account']).to eql true
        logout
        
        # No puede entrar despues de 12 meses y un minuto
        fifteen_months_after_plus_one_minute = fifteen_months_after + 1.minute
        Timecop.travel(fifteen_months_after_plus_one_minute)

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
