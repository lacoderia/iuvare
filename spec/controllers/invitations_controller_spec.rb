feature 'InvitationsController' do

  let!(:user){ create(:user) }
  
  describe 'send contact from webpage' do
    context 'send_contact' do
      it 'successfully sends contact email' do
          
        contact_request = {nombre: "Jorge", ocupacion: "", telefono: "", email: "test@test.com", enteraste: "", comentarios: ""}
        
        mail_count = ActionMailer::Base.deliveries.count
          
        # Validates request creation
        with_rack_test_driver do
          page.driver.post "/invitations/send_contact.json", { contact: contact_request}
        end
        
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(ActionMailer::Base.deliveries.count).to eql (mail_count + 1)

      end
    end

  end

  describe 'request process' do
    context 'request creation' do

      it 'successfully creates invitation' do
          new_invitation = { recipient_name: "Pedrito Bodoque", recipient_email: "dmiramon@gmail.com", user_id:user.id}
          login_with_service u = { email: user.email, password: '12345678' }

          # Validates request creation
          with_rack_test_driver do
              page.driver.post "/invitations.json", { invitation: new_invitation}
          end
          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result']['token']).not_to eql nil
          expect(response['result']['recipient_email']).to eql "dmiramon@gmail.com"
      end

      it 'raises error on incorrect invitation' do
        new_invitation = { recipient_name: "Pedrito Bodoque", recipient_email: "dmiramon@gmail.com", user_id:-1}
        login_with_service u = { email: user.email, password: '12345678' }

        # Validates request creation
        with_rack_test_driver do
          page.driver.post "/invitations.json", { invitation: new_invitation}
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false
      end
    end
  end
end
