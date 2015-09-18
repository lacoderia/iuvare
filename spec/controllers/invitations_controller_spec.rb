feature 'InvitationsController' do

  let!(:user){ create(:user) }
  
  describe 'send contact from webpage' do
    context 'send_contact' do
      it 'successfully sends contact email' do
        
        mail_count = ActionMailer::Base.deliveries.count
        visit "#{send_contact_invitations_path}.json?callback=jQuery19101328918649815023_1442606277767&contact%5Bnombre%5D=test&contact%5Btelefono%5D=4353453&contact%5Bemail%5D=tonklis%40gmail.com&contact%5Benteraste%5D=&contact%5Bcomentarios%5D=&_=1442606277769"
        
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
