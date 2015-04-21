feature 'InvitationsController' do
  let!(:user){ create(:user) }
  describe 'request process' do
    context 'request creation' do

      it 'successfully creates invitation' do
          new_invitation = { recipient_name: "Pedrito Bodoque", recipient_email: "dmiramon@gmail.com", user_id:user.id}
          # Validates request creation
          with_rack_test_driver do
              page.driver.post "/invitations.json", { invitation: new_invitation}
          end
          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result']['token']).not_to eql nil
          expect(response['result']['recipient_email']).to eql "dmiramon@gmail.com"
      end
    end
  end
end
